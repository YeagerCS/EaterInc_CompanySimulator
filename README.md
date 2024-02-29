# Eater Inc.

## Description
Eater Inc. is an employee & bank manager web application which uses React in the frontend and node with express in the backend. 

## Features
### Detailed Description
The application consists of a frontend web page which has an admin- and an employee dashboard. There is an admin account, which is the CEO of the fictional company "The Eater Inc.", who can add other employees and pay them a salary. Every employee gets a password generated and can log into their account. Upon login, the user gets the option to choose a Bank for themselves, in which they want to store their money. The CEO has an bank account aswell and pays salary to the employees. The admin can update employees' details, give them raises, change job titles and so on. Each employee, when they logged in to their account, can complete transactions, by sending money to other employees. An employee can enter another employees name and then choose the searched employee from a list.

### Admin
The admin has some differences from regular employees.  
Admin login credentials:
```
Employee Number: 1000
Password: the
```
- The admin account is assigned to the bank with Id 1 => Battle Bus Banking Co.
- The admin has an initial balance ranging from `6mio to 17mio`
- You can modify admin data in `/server/services/initAdmin.js` and `/server/services/initCompanyBankAccount.js`
