// Copyright (c) 2025, KlyONIX Tech Consulting Pvt Ltd and contributors
// For license information, please see license.txt

frappe.after_ajax(() => {
	const button = document.createElement("button");
	button.id = "quickhelp-ticket-button";
	button.innerHTML = '<i class="fa fa-ticket"></i> Create Ticket';
	button.style.position = "fixed";
	button.style.bottom = "20px";
	button.style.right = "20px";
	button.style.zIndex = "1000";
	button.style.padding = "10px 20px";
	button.style.backgroundColor = "#28a745";
	button.style.color = "#fff";
	button.style.border = "none";
	button.style.borderRadius = "5px";
	button.style.cursor = "pointer";
	button.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    
	// Append the button to the body
	document.body.appendChild(button);
    
	// Add click event to trigger the ticket creation popup
	button.addEventListener("click", function() {
	    new quickhelp.SupportTicket();
	});
    });