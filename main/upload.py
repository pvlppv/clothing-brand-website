from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, login_required, logout_user, current_user
from main.models import Product
from main import db


adm = Blueprint('adm', __name__)

@adm.route('/upload', methods = ['GET', 'POST'])
@login_required
def admin1():
    email = current_user.email
    if email != 'admin@gmail.com':
        flash('fuck off you cunt, you are not an admin!')
        return redirect(url_for('auth.login'))
    else:
        if request.method=='POST':
            name=request.form.get('name')
            price=request.form.get('price')
            description=request.form.get('description')
            image_main=request.files.get('image_main')
            new_prod = Product(name = name, price= price, description=description, image_main= image_main)
            db.session.add(new_prod)
            db.session.commit()

            return render_template('login.html', )    

    return render_template("upload.html", user=current_user)