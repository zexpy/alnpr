import sqlite3
from sqlite3 import Error

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('alnpr.db')
        return conn
    except Error as e:
        print(e)
    return conn

def create_tables(conn):
    try:
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS stats
                     (id INTEGER PRIMARY KEY,
                      detections INTEGER DEFAULT 0,
                      recognitions INTEGER DEFAULT 0)''')
        
        # Insert initial row if not exists
        c.execute('''INSERT OR IGNORE INTO stats (id, detections, recognitions)
                     VALUES (1, 0, 0)''')
        conn.commit()
    except Error as e:
        print(e)

def increment_detections(conn):
    try:
        c = conn.cursor()
        c.execute('''UPDATE stats SET detections = detections + 1 WHERE id = 1''')
        conn.commit()
    except Error as e:
        print(e)

def increment_recognitions(conn):
    try:
        c = conn.cursor()
        c.execute('''UPDATE stats SET recognitions = recognitions + 1 WHERE id = 1''')
        conn.commit()
    except Error as e:
        print(e)

def get_stats(conn):
    try:
        c = conn.cursor()
        c.execute('''SELECT detections, recognitions FROM stats WHERE id = 1''')
        return c.fetchone()
    except Error as e:
        print(e)
    return (0, 0)

# Initialize the database
conn = create_connection()
if conn is not None:
    create_tables(conn)
    conn.close()