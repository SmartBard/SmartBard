import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv

load_dotenv()
conn = None

try:
    with psycopg2.connect(
        host = 'localhost',
        dbname = 'postgres',
        user = 'postgres',
        password = os.getenv('PASSWORD'),
        port = '5432'
    )  as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
        
            create_script = ''' CREATE TABLE IF NOT EXISTS test (
                                    id  INT PRIMARY KEY,
                                    name VARCHAR(40) NOT NULL,
                                    salary INT,
                                    dept_id VARCHAR(30))'''
            cur.execute(create_script)

            insert_script = 'INSERT INTO test (id, name, salary, dept_id) VALUES (%s, %s, %s, %s)'
            update_script = 'UPDATE test SET salary = salary + (salary * 0.5)'
            delete_script = 'DELETE FROM test WHERE name = %s'

            # insert_value = (1, 'Mustang', 24000, 'D1')
            # cur.execute(insert_script, insert_value)

            # insert_values = [(2, 'Mustard', 12000, 'D2'), (3, 'Moustache', 100000, 'D3'), (4, 'Musty', 6000, 'D4')]
            # for person in insert_values:
            #     cur.execute(insert_script, person)
            
            cur.execute(update_script)
            cur.execute(delete_script, ('Musty',))

            cur.execute('SELECT * FROM test')
            # print(cur.fetchall())
            for person in cur.fetchall():
                print(person['name'], person['salary'])

except Exception as error:
    print(error)
finally:
    if conn is not None:
        conn.close()
