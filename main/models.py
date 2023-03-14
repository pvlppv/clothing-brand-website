from main import db
from datetime import datetime
from flask_login import UserMixin



class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    datetime = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

class Product(db.Model):
    __searchbale__ = ['name','desc']
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    url = db.Column(db.String(80), nullable=False, unique=True)
    price_new = db.Column(db.Integer, nullable=False)
    price_old = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    quantity_S = db.Column(db.Integer, nullable=True)
    quantity_M = db.Column(db.Integer, nullable=True)
    quantity_L = db.Column(db.Integer, nullable=True)
    quantity_XL = db.Column(db.Integer, nullable=True)
    inCart = db.Column(db.Integer, nullable=False, default='0')
    img = db.Column(db.String(150), nullable=False)

    featured_1 = db.Column(db.String(150), nullable=True)
    featured_2 = db.Column(db.String(150), nullable=True)
    featured_3 = db.Column(db.String(150), nullable=True)

    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category')

    def __repr__(self):
        return self.url

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)

    def __repr__(self):
        return self.name
    
class NewDrop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String(150), nullable=False)
    text = db.Column(db.String(150), nullable=False)
    
    url_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    url = db.relationship('Product')


class Gallery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String(150), nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    url = db.Column(db.String(80), nullable=False, unique=True)
    price = db.Column(db.Integer, nullable=False)
    quantity_S = db.Column(db.Integer, nullable=False)
    quantity_M = db.Column(db.Integer, nullable=False)
    quantity_L = db.Column(db.Integer, nullable=False)
    quantity_XL = db.Column(db.Integer, nullable=False)
    img = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telephone = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(500), nullable=False)
    delivery = db.Column(db.String(150), nullable=False)

    
