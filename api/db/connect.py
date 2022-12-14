import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
conn, cur = None, None

try:
    conn = psycopg2.connect(
        host = 'localhost',
        dbname = 'postgres',
        user = 'postgres',
        password = os.getenv('PASSWORD'),
        port = '5432'
    )
    cur = conn.cursor()
    
    cur.execute('SELECT * FROM person')
    print(cur.fetchall())

    conn.commit()
except Exception as error:
    print(error)
finally:
    if conn is not None:
        conn.close()
    if cur is not None:
        cur.close()
