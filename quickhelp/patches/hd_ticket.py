import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def execute():
    custom_fields = {
        "HD Ticket": [
            {
                "fieldname": "kly_module",
                "fieldtype": "Select",
                "label": "Module",
                "options": "\nAccounts\nBuying\nSelling\nHR\nStock\nProjects\nCRM\nManufacturing\nOther",
                "insert_after": "priority",
                "reqd": 1,
                "placeholder": "Select the module",
                "description": "Choose the module where the issue is occurring."
            },
            {
                "fieldname": "kly_customer_name",
                "fieldtype": "Data",
                "label": "Customer Name",
                "insert_after": "customer",
                "options": "Customer",          
                "fetch_from": "customer.kly_customer",        
                "read_only": 1                   
            }
        ]
    }

    create_custom_fields(custom_fields, update=True)
