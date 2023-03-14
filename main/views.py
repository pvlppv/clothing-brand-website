from flask import Blueprint, render_template, request, flash, redirect, url_for, session
from flask_login import login_user, login_required, logout_user, current_user
from main.models import Product, Gallery, NewDrop


views = Blueprint('views', __name__)


@views.route('/')
def home_page():
    products = Product.query.all()
    galleries = Gallery.query.all()
    new_drop = NewDrop.query.all()
    return render_template('index.html', products=products, galleries=galleries, user=current_user, new_drop=new_drop)

@views.route('/shop')
def shop():    
    products = Product.query.all()
    return render_template("shop.html", products=products, user=current_user)

@views.route('/<product_url>')
def product_page(product_url):
    product = Product.query.filter_by(url=product_url).first()
    if product:
        return render_template('product.html', product=product, user=current_user)
    else:
        return 'Not found.'

@views.route('/<new_drop_url>')
def product_page_2(new_drop_url):
    new_drop = NewDrop.query.filter_by(url=new_drop_url).first()
    if new_drop:
        return render_template('product.html', new_drop=new_drop, user=current_user)
    else:
        return 'Not found.'
    


@views.route('/gallery')
def gallery():
    return render_template("gallery.html", user=current_user)

@views.route('/contacts')
def contacts():
    return render_template("index.html", user=current_user)

@views.route('/cart', methods=['POST', 'GET'])
def cart():
    products = Product.query.all()
    return render_template("cart.html", user=current_user, products=products)

@views.route('/politika')
def politika():
    return render_template("politika.html", user=current_user)

@views.route('/vozvrat')
def vozvrat():
    return render_template("vozvrat.html", user=current_user)

@views.route('/dostavka')
def dostavka():
    return render_template("dostavka.html", user=current_user)

@views.route('/addcart', methods=['POST'])
def AddCart():
    try:
            if "cart" not in session:
                session["cart"] = []
            cart = session["cart"]

            if request.method == "POST":
                item = request.form.get("item")
                if item:
                    cart.append(item)

            return render_template("cart.html", cart=cart)
    except Exception as e:
        print(e)
    finally:
        return redirect(request.referrer)

@views.errorhandler(404)
def page_not_found():
    return render_template("404.html")
