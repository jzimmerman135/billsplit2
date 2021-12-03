# billsplit2
Final project
## General Updates
- New contact page
- New user feedback form page
- New how to use page
- Sign in page
  - log in page
  - sign up page
  - cookies to remember user
- Create database
  - MongoDB
  - determine what info is needed and how it will be stored
- Create history page
  - menu with dates and names
  - on click, menu slides left and receipt slides in
- Create groups page
  - view group balance, old receipts
  - create a new group
- store receipt
- javascript code
  - populate receipt function
  - go back function
  - 'all - b' shared by input

## Database Info
What we will need to store:
- All users
  - username
  - password
- User information
  - email/username
  - first name
  - google information?
  - password
  - things eaten
  - all groups they have shared with
  - all receipts they have used
- Receipt info
  - date-time
  - receipt title
  - who it is shared between
    - usernames
    - first names
    - initials
  - totals of how much is owed
  - who paid
  - list of items and names and prices and who it is shared by
  - tax
  - subtotal
  - total
 
```
{
	"items": [
	  	{
			"name": "eggs",
			"price": 2.50,
			"sharedBy": ["Jacob", "Eddy", "Kev", "Adnan"]
		},
		{
			"name": "butter",
			"price": 4,
			"sharedBy": ["Kev", "Adnan"]
		},
		{
			"name": "chicken",
			"price": 12.50,
			"sharedBy": ["Jacob", "Kev", "Adnan"]
		}
	]
}
```
###full example 
```
{
	"id": "as8943nks01",
	"title" : "trader joes groceries",
	"date": "12/3/2021",
	"people": [{
			"username": "jzimm135",
			"name": "Jacob",
			"initial": "j",
			"owes": 5.05
		},
		{
			"username": "ehe340",
			"name": "Eddy",
			"initial": "e",
			"owes": -19.37
		},
		{
			"username": "kev12",
			"name": "Kev",
			"initial": "k",
			"owes": 7.16
		},
		{
			"username": "none",
			"name": "Adnan",
			"initial": "a",
			"owes": 7.16
		}
	],
	"tax": 5.25,
	"subtotal": 19,
	"total": 19.95,
	"payer": 1,
	"items": [{
			"name": "eggs",
			"price": 2.50,
			"sharedBy": ["Jacob", "Eddy", "Kev", "Adnan"],
			"sharedByString": "jeka"
		},
		{
			"name": "butter",
			"price": 4,
			"sharedBy": ["Kev", "Adnan"],
			"sharedByString": "ka"
		},
		{
			"name": "chicken",
			"price": 12.50,
			"sharedBy": ["Jacob", "Kev", "Adnan"],
			"sharedByString": "jka"
		}
	]
}
```
