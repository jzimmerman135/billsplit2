# billsplit2
Final project
## General Updates
- New contact page
- New user feedback form page
- New how to use page
- Sign in page
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
