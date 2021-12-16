import sqlite3
conn = sqlite3.connect('elements.db')
# c.execute("""CREATE TABLE elements (
#     itemId INTEGER PRIMARY KEY,
#     elementName text
#     )""")
    # c.execute(
    #     "INSERT INTO elements (itemId, elementName) VALUES (NULL, 'Water')")
    # c.execute("SELECT * FROM elements")
# c.execute("INSERT INTO elements (itemId, elementName) VALUES (NULL, 'Water')")
# c.execute("SELECT * FROM elements")
        # c.execute("""CREATE TABLE elements (
    # itemId INTEGER PRIMARY KEY,
    # elementName text
    # )""")
    # c.execute("DELETE FROM elements WHERE elementName")
    # c.execute("INSERT INTO elements (itemId, elementName) VALUES (NULL, 'Fire')")
    # conn = sqlite3.connect("tutorial2.db")

# def create_table():
#     c = conn.cursor()
#     c.execute('CREATE TABLE IF NOT EXISTS stuffToPlot (unix REAL, datestamp TEXT, keyword TEXT, value REAL)')
#     c.close()

# def data_entry():
#     c = conn.cursor()
#     c.execute("INSERT INTO stuffToPlot VALUES (145123542, '2016-01-03', 'Python', 7)")
#     conn.commit()
#     c.close()
c = conn.cursor()

conn.commit()

c.close()

c.fetchall()

print(c.fetchall())

c.fetchall()
print("oi", c.fetchall())

conn.close()

# class User:
#     """User class"""

#     def __init__(self, email, username, password):
#         self.email = email
#         self.username = username
#         self.password = password

#     def insert_user(user):
#         with conn:
#             conn.execute("INSERT INTO users VALUES (:first, :last, :pay)", {
#                          'first': user.first, 'last': user.last, 'pay': user.pay})


#     def get_users_by_name(username):
#         conn.execute("SELECT * FROM users WHERE username=:username",
#                  {'username': username})
#         return conn.fetchall()


# def update_pay(emp, pay):
#     pass


# def remove_emp(emp):
#     pass


# def update_pay(emp, pay):
#     with conn:
#         conn.execute("""UPDATE employees SET pay = :pay
#                     WHERE first = :first AND last = :last""",
#                      {'first': emp.first, 'last': emp.last, 'pay': pay})

#     def __repr__(self):
#         return "Employee('{}', {})".format(self.email, self.username)
