import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def execute():
    custom_fields = {
        "HD Customer": [
            {
                "fieldname": "kly_customer",
                "fieldtype": "Data",
                "label": "Customer",
                "insert_after": "customer_name",                 
            }
        ]
    }

    create_custom_fields(custom_fields, update=True)
