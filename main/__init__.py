from flask import Flask, request, url_for, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import IMAGES, UploadSet, configure_uploads, patch_request_class
from flask_login import LoginManager, current_user
from flask_admin import Admin, AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from sqlalchemy import desc
from wtforms import SelectField
import os


basedir = os.path.abspath(os.path.dirname(__file__))

db = SQLAlchemy()
DB_NAME='franchise_brand.db'

class MyAdminIndexView(AdminIndexView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == 'admin'
    
    def __init__(self, *args, **kwargs):
        super(MyAdminIndexView, self).__init__(*args, **kwargs)
        self.static_folder = 'static'

    column_list = ('Name')
    column_searchable_list = ('Name',)
    column_default_sort = ('Name', True)
    column_filters = ('Name',)
    
class MyUserView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == 'admin'

    form_overrides = {
        'role': SelectField
    }
    form_args = {
        'role': {
            'choices': [
                ('user', 'User'),
                ('admin', 'Admin'),
            ]
        }
    }
    form_create_rules = ['email', 'password', 'role']
    form_edit_rules = ['role']

class MyModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == 'admin'
    

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'franchise_brand'
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_NAME}"
    db.init_app(app)
    app.config['UPLOADED_PHOTOS_DEST'] = os.path.join(basedir, 'static/images')

    admin = Admin(app, name='FRANCHISE BRAND ADMIN', index_view=MyAdminIndexView())

    photos = UploadSet('photos', IMAGES)
    configure_uploads(app, photos)
    patch_request_class(app)

    from main.models import User, Product, Category, Gallery, Order, NewDrop
    admin.add_view(MyModelView(Order, db.session))
    admin.add_view(MyUserView(User, db.session))
    admin.add_view(MyModelView(Product, db.session))
    admin.add_view(MyModelView(Category, db.session))
    admin.add_view(MyModelView(Gallery, db.session))
    admin.add_view(MyModelView(NewDrop, db.session))
    with app.app_context():
        # db.session.execute('ALTER TABLE Product ADD COLUMN inCart INTEGER NOT NULL DEFAULT 0')
        # db.session.commit()
        db.create_all()
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    from main.views import views
    from main.auth import auth
    from main.upload import adm
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(adm, url_prefix='/')
    
    return app