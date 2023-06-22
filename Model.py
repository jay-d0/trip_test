import pandas as pd
import numpy as np
import warnings

import torch
from transformers import AutoTokenizer, AutoModel, pipeline
from sentence_transformers import SentenceTransformer
from googletrans import Translator

from sklearn.metrics.pairwise import cosine_similarity
from math import radians, sin, cos, sqrt, atan2
from glob import glob

def lib_import():
    import pandas as pd
    import numpy as np
    import warnings

    import torch
    from transformers import AutoTokenizer, AutoModel, pipeline
    from sentence_transformers import SentenceTransformer
    from googletrans import Translator
    
    from sklearn.metrics.pairwise import cosine_similarity
    from math import radians, sin, cos, sqrt, atan2
    from glob import glob

# google_translate
def translate_korean_to_english(text):
        translator = Translator()
        translation = translator.translate(text, src='ko', dest='en')
        return translation.text

# 관광지, 음식, 호텔 분류 모델
# def zero_shot_classification(text: str):
#     classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
#     labels = ["food", "hotel", "attraction"]
#     text = translate_korean_to_english(text)
#     result = classifier(text, labels)

#     top_category = result["labels"][0]

#     return top_category

def zero_shot_classification(text):
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    labels = ["food", "hotel", "attraction"]
    text = translate_korean_to_english(text)
    result = classifier(text, labels)

    top_category = result["labels"][0]
    if top_category == "food":
        labels2 = ['cafe','alcohol','meal']
        
        result2 = classifier(text, labels2)
        top_category = result2["labels"][0]
        return top_category
        
    return top_category

# 관광지
def calculate_distance(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    distance = 6371 * c
    return distance

# 관광지 추천
def recommend_attractions(category: str, current_lat: float, current_lon: float):
    attractions = pd.read_csv('./data/attractions_reviews_summarized_coordinate.csv')

    if category == 'Famous':
        attractions = attractions.head(20)

    attractions_with_distance = []
    for _, attraction in attractions.iterrows():
        attraction_lat = attraction['Latitude']
        attraction_lon = attraction['Longitude']
        distance = calculate_distance(current_lat, current_lon, attraction_lat, attraction_lon)
        attractions_with_distance.append((attraction, distance))

    attractions_with_distance.sort(key=lambda x: x[1])

    recommended_attractions = attractions_with_distance[:6]
    recom = [{"key": attraction['Attraction'].lower().replace(' ', '-'),
              "title": attraction['Attraction'], "review_summary": attraction['Summary'],
              "lat": attraction['Latitude'], "lng": attraction['Longitude']}
              for attraction, _ in recommended_attractions] 

    return recom


# 음식 세부 카테고리 질문 분류
def food_classification(text):
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    labels = ["coffee", "restaurants", "bar"]
    text = translate_korean_to_english(text)
    result = classifier(text, labels)

    top_category = result["labels"][0]
    return top_category

# 커피 처리 
def process_cafe(input_text, option):
    df = pd.read_csv('./data/merged_review_cafe_embedding.csv')
    df['embedding'] = df['embedding'].apply(lambda x: np.fromstring(x[1:-1], sep=' '))
    metadata = pd.read_csv('./data/카페정보Final.csv')

    # 음식 option은 2개로만 함.
    if option == 'premium':
        metadata_filtered = metadata[metadata['Price'] >= metadata['Price'].median()]
    else:
        metadata_filtered = metadata[metadata['Price'] < metadata['Price'].median()]

    filtered_entities = metadata_filtered['Entity'].tolist()
    df = df[df['entity'].isin(filtered_entities)]

    model = SentenceTransformer('bert-base-nli-mean-tokens')

    topic_embedding = model.encode([input_text], convert_to_tensor=True).detach().cpu().numpy()[0]
    df['similarity'] = df['embedding'].apply(lambda x: cosine_similarity(x.reshape(1, -1), topic_embedding.reshape(1, -1))[0][0])
    
    df = df.sort_values('similarity', ascending=False)  # similarity에 따라 내림차순으로 정렬
    
    recommended_restaurants = []
    visited_entities = set()  # 이미 선택된 entity를 추적하기 위한 집합
    for _, row in df.iterrows():
        recommended_restaurant = row['entity']
        if recommended_restaurant not in visited_entities:  # 이미 선택된 entity가 아닌 경우에만 추가
            visited_entities.add(recommended_restaurant)
            name_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Name'].values[0]
            address_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Address'].values[0]
            latitude_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Latitude'].values[0]
            longitude_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Longitude'].values[0]
            recommended_restaurants.append((name_recommended_restaurant, address_recommended_restaurant, latitude_recommended_restaurant, longitude_recommended_restaurant))
            if len(recommended_restaurants) == 3:  # 3개의 서로 다른 entity를 선택했을 경우 반복문 종료
                break

    recommendations = []
    for _, (name, _, latitude, longitude) in enumerate(recommended_restaurants):
        recommendation = {
            "title": name,
            "lat": latitude,
            "lng": longitude
        }
        recommendations.append(recommendation)

    return recommendations

# 식당
def process_restaurant(input_text, option):
    
    df = pd.read_csv('./data/merged_review_restaurants_embedding.csv')
    df['embedding'] = df['embedding'].apply(lambda x: np.fromstring(x[1:-1], sep=' '))
    metadata = pd.read_csv('./data/식당정보Final.csv')

    # 음식 option은 2개로만 함.
    if option == 'premium':
        metadata_filtered = metadata[metadata['Price'] >= metadata['Price'].median()]
    else:
        metadata_filtered = metadata[metadata['Price'] < metadata['Price'].median()]

    filtered_entities = metadata_filtered['Entity'].tolist()
    df = df[df['entity'].isin(filtered_entities)]

    model = SentenceTransformer('bert-base-nli-mean-tokens')

    topic_embedding = model.encode([input_text], convert_to_tensor=True).detach().cpu().numpy()[0]
    df['similarity'] = df['embedding'].apply(lambda x: cosine_similarity(x.reshape(1, -1), topic_embedding.reshape(1, -1))[0][0])
    
    df = df.sort_values('similarity', ascending=False)  # similarity에 따라 내림차순으로 정렬
    
    recommended_restaurants = []
    visited_entities = set()  # 이미 선택된 entity를 추적하기 위한 집합
    for _, row in df.iterrows():
        recommended_restaurant = row['entity']
        if recommended_restaurant not in visited_entities:  # 이미 선택된 entity가 아닌 경우에만 추가
            visited_entities.add(recommended_restaurant)
            name_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Name'].values[0]
            address_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Address'].values[0]
            latitude_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Latitude'].values[0]
            longitude_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Longitude'].values[0]
            recommended_restaurants.append((name_recommended_restaurant, address_recommended_restaurant, latitude_recommended_restaurant, longitude_recommended_restaurant))
            if len(recommended_restaurants) == 3:  # 3개의 서로 다른 entity를 선택했을 경우 반복문 종료
                break

    recommendations = []
    for _, (name, _, latitude, longitude) in enumerate(recommended_restaurants):
        recommendation = {
            "title": name,
            "lat": latitude,
            "lng": longitude
        }
        recommendations.append(recommendation)

    return recommendations

# 술집
def process_bar(input_text, option):
    
    df = pd.read_csv('./data/merged_review_bar_embedding.csv')
    df['embedding'] = df['embedding'].apply(lambda x: np.fromstring(x[1:-1], sep=' '))
    metadata = pd.read_csv('./data/술집정보Final.csv')

    # 음식 option은 2개로만 함.
    if option == 'premium':
        metadata_filtered = metadata[metadata['Price'] >= metadata['Price'].median()]
    else:
        metadata_filtered = metadata[metadata['Price'] < metadata['Price'].median()]

    filtered_entities = metadata_filtered['Entity'].tolist()
    df = df[df['entity'].isin(filtered_entities)]

    model = SentenceTransformer('bert-base-nli-mean-tokens')

    topic_embedding = model.encode([input_text], convert_to_tensor=True).detach().cpu().numpy()[0]
    df['similarity'] = df['embedding'].apply(lambda x: cosine_similarity(x.reshape(1, -1), topic_embedding.reshape(1, -1))[0][0])
    
    df = df.sort_values('similarity', ascending=False)  # similarity에 따라 내림차순으로 정렬
    
    recommended_restaurants = []
    visited_entities = set()  # 이미 선택된 entity를 추적하기 위한 집합
    for _, row in df.iterrows():
        recommended_restaurant = row['entity']
        if recommended_restaurant not in visited_entities:  # 이미 선택된 entity가 아닌 경우에만 추가
            visited_entities.add(recommended_restaurant)
            name_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Name'].values[0]
            address_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Address'].values[0]
            latitude_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Latitude'].values[0]
            longitude_recommended_restaurant = metadata.loc[metadata['Entity'] == recommended_restaurant, 'Longitude'].values[0]
            recommended_restaurants.append((name_recommended_restaurant, address_recommended_restaurant, latitude_recommended_restaurant, longitude_recommended_restaurant))
            if len(recommended_restaurants) == 3:  # 3개의 서로 다른 entity를 선택했을 경우 반복문 종료
                break

    recommendations = []
    for _, (name, _, latitude, longitude) in enumerate(recommended_restaurants):
        recommendation = {
            "title": name,
            "lat": latitude,
            "lng": longitude
        }
        recommendations.append(recommendation)

    return recommendations

# 호텔 추천 모델
def hotel_chat(text_input, price_level='premium', aspects=['cleanness', 'convenience', 'silence']):
    # data load
    warnings.filterwarnings(action='ignore')
    reviews = pd.read_csv('./data//reviews_absa.csv')

    # example persona & selected aspect
    # price_level = ['premium', 'high', 'usual', 'low']
    # aspects_candi = ["cleanness", "silence", "traffic",
    #                 "kindness", "convenience", "facilities"]

    def filtering(df, price_level='usual', aspects=[]):
        # persona 설정에 의한 price level filtering
        def persona(df, price_level):
            if price_level == 'low':
                df = df[df.price <= 300000]
            elif price_level  == 'usual':
                df = df[(df.price > 300000) * (df.price <= 600000)]
            elif price_level == 'high':
                df = df[(df.price > 600000) * (df.price <= 800000)]
            elif price_level == 'premium':
                df = df[df.price > 800000]
            return df

        # aspect 설정에 의한 top 5 hotels filtering
        def select_aspect(df, aspects):
            df = df[list(set(df.columns) - set(['reviews']))]
            df = df.groupby(by='hotel').agg(np.average).reset_index()
            columns = [aspect + '_prob_positive' for aspect in aspects]
            hotels = df.sort_values(by=columns, ascending=False)[['hotel'] + columns][:7]
            hotels.columns = [column.replace('_prob_positive', '')
                                if '_prob_positive' in column
                                else column for column in hotels.columns]
            hotels[hotels.columns[1:]] = hotels[hotels.columns[1:]].apply(
                lambda x: np.floor(x*100)/10
            )
            return hotels
        
        return select_aspect(persona(df, price_level), aspects)

    filtered_df = filtering(reviews, price_level=price_level, aspects=aspects)
    filtered_df = reviews[reviews.columns[:3]].merge(filtered_df, how='inner', on='hotel')
    hotels = list(filtered_df['hotel'])

    # 대상 hotel filtering
    paths = glob('./data/hotels/*.csv')

    filtered_paths = list()
    for path in paths:
      for hotel in hotels:
        if hotel in path:
          filtered_paths.append(path)
          break
    
    tokenizer = AutoTokenizer.from_pretrained("deepset/sentence_bert")
    model = AutoModel.from_pretrained("deepset/sentence_bert")

    inputs = tokenizer(text_input, padding='max_length', max_length = 128,
                      truncation=True, return_tensors="pt")
    text_vector = model(**inputs)
    text_vector = [float(x) for x in text_vector.pooler_output[0]]

    # caculate similarity
    best_list = list()
    for path in filtered_paths:
        hotel_df = pd.read_csv(path)
            
        hotel_df['similarity'] = cosine_similarity(list(hotel_df.embedded.apply(eval)), [text_vector]).reshape(1,-1)[0]
        
        best_list.append(hotel_df[hotel_df['similarity'] == max(hotel_df['similarity'])])

    best_reviews = pd.concat(best_list)
    best_reviews = best_reviews[['hotel', 'price', 'reviews', 'similarity'] + [aspect + '_prob_positive' for aspect in aspects]]\
        .sort_values(by='similarity', ascending=False)[:3]

    best_reviews.columns = ['hotel', 'price', 'reviews', 'similarity'] + [aspect for aspect in aspects]
    for aspect in aspects:
        best_reviews[aspect] = best_reviews[aspect].apply(lambda x: int(x * 100)/10)

    return best_reviews