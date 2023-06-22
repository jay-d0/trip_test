# uvicorn main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from Model import *

app = FastAPI()
lib_import()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test API
@app.post("/")
def read_root():
    return {"Hello": "어떤 호텔을 찾고 있나요?"}

# Do/Eat/Stay 구분
class Text(BaseModel):
    A: str

@app.post("/what")
def read_what(text: Text):
    A = list(dict(text).values())[0]
    what = zero_shot_classification(A)

    return {"what": what}

# 관광지 추천
class Place(BaseModel):
    pers_far: str
    lat: float
    lng: float

@app.post("/place")
def read_place(place: Place):
    pers_far, lat, lng = dict(place).values()
    lat, lng = float(lat), float(lng)
    places = recommend_attractions(category=pers_far, current_lat=lat, current_lon=lng)

    return places

# 카페 추천
class Cafe(BaseModel):
    A: str
    pers_price: str

@app.post("/cafe")
def read_place(cafe: Cafe):
    A, pers_price = dict(cafe).values()
    cafes = process_cafe(input_text=A, option=pers_price)

    return cafes

# 식당 추천
class Meal(BaseModel):
    A: str
    pers_price: str

@app.post("/meal")
def read_place(meal: Meal):
    A, pers_price = dict(meal).values()
    meals = process_restaurant(input_text=A, option=pers_price)

    return meals

# 술집 추천
class Bar(BaseModel):
    A: str
    pers_price: str

@app.post("/bar")
def read_place(bar: Bar):
    A, pers_price = dict(bar).values()
    bars = process_bar(input_text=A, option=pers_price)

    return bars

# Hotel
class Hotels(BaseModel):
    A: str
    pers_price: str
    pers_aspect: str

@app.post("/hotel")
def read_hotel(hotels: Hotels):
    text_input, price_level, aspects = dict(hotels).values()
    aspects = aspects.split(',')
    hotel_df = hotel_chat(text_input, price_level, aspects)
    return [{"title": row['hotel'],
             "key": price_level,
             "aspects":{k:v for k, v in zip(aspects, row[aspects])}}
             for _, row in hotel_df.iterrows()]