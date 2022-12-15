import psycopg2
from sqlalchemy import create_engine, ForeignKey, Column, Integer, String, CHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

def get_engine(user, password, host, port, db):
    url = f'postgresql://{user}:{password}@{host}:{port}/{db}'
    if not database_exists(url):
        create_database(url)
    engine = create_engine(url, pool_size=50, echo=True)
    return engine

try:
    Base = declarative_base()

    # Using SQLAlchemy to turn existing db entries into Objects
    class Person(Base):
        __tablename__ = 'test'
        id = Column('id', Integer, primary_key=True)
        name = Column('name', String)
        salary = Column('salary', String)
        
        def __init__(self, id, name, salary):
            self.id = id
            self.name = name
            self.salary = salary
        
        def __repr__(self):
            return f'({self.id}) {self.name} {self.salary}'

    class Asset(Base):
        __tablename__ = 'Asset'
        asset_id = Column('asset_id', Integer, primary_key=True)
        desc = Column('description', String)
        owner = Column(Integer, ForeignKey('test.id'))

        def __init__(self, asset_id, desc, owner):
            self.asset_id = asset_id
            self.desc = desc
            self.owner = owner

        def __repr__(self):
            return f'({self.asset_id}) {self.desc} owned by {self.owner}'

    engine = get_engine(
        'postgres',                 # user
        os.getenv('PASSWORD'),      # pass
        'localhost',                # host
        '5432',                     # port
        'postgres'                  # database name
    )
    Base.metadata.create_all(bind=engine)

    Session = sessionmaker(bind=engine)
    session = Session()

    p1 = Person(1, 'Mustang', 54000)
    p2 = Person(2, 'Mustard', 27000)
    p3 = Person(3, 'Moustache', 225000)
    
    # Uncomment if creating test table for first time and need to add data
    # session.add(p1)
    # session.add(p2)
    # session.add(p3)

    people = session.query(Person).all()
    # print(people)
    # for person in people:
    #     print(person)

    a1 = Asset(1, 'Car', people[0].id)
    a2 = Asset(2, 'Sandwich', people[1].id)
    a3 = Asset(3, 'Shaving Cream', people[2].id)
    session.add(a1)
    session.add(a2)
    session.add(a3)
    
    session.commit()

except Exception as error:
    print(error)