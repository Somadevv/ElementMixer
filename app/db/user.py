import sqlite3
conn = sqlite3.connect('users.db')

c = conn.cursor()
# c.execute("""CREATE TABLE users (
#     userId INTEGER PRIMARY KEY,
#     username text,
#     email text,
#     password, text
#     )""")

# c.execute("INSERT INTO users VALUES (1, '', 'Jubbly', 'somadev@hotmail.co.uk', 'password')")
c.execute("SELECT * FROM users")
print(c.fetchall())

conn.commit()

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
