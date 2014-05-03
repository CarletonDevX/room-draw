'''Some functions to switch room names back and forth between full names and four-letter keys.
David Pickart 4/29/14'''

def nameToKey(roomname):
	'''Replaces names with corresponding abbreviations.'''

	if "Nason" in roomname:
		roomname = "NASN"
	elif "James" in roomname:
		roomname = "JAME"
	elif "Burton" in roomname:
		roomname = "BURT"
	elif "Davis" in roomname: 
		roomname = "DAVI"
	elif "Nourse" in roomname:
		roomname = "NOUR"
	elif "Severance" in roomname:
		roomname = "SEVY"
	elif "Dixon" in roomname:
		roomname = "DIXN"
	elif "Watson" in roomname:
		roomname = "WATS"
	elif "Owens" in roomname:
		roomname = "OWNS"
	elif "Dow House" in roomname:
		roomname = "DOWH"
	elif "Evans" in roomname:
		roomname = "EVAN"
	elif "Cassat" in roomname:
		roomname = "CASS"
	elif "Myers" in roomname:
		roomname = "MYER"
	elif "Musser" in roomname:
		roomname = "MUSS"
	elif "Rice House" in roomname:
		roomname = "RICE"
	elif "Goodhue" in roomname:
		roomname = "GHUE"
	elif "Allen" in roomname:
		roomname = "ALLE"
	elif "Hill" in roomname:
		roomname = "HILL"
	elif "Faculty" in roomname:
		roomname = "FACL"
	elif "Parish" in roomname:
		roomname = "PRSH"
	elif "Wilson" in roomname:
		roomname = "WILS"
	elif "Hunt" in roomname:
		roomname = "HNTH"
	elif "Eugster" in roomname:
		roomname = "EUGS"
	elif "Colwell" in roomname:
		roomname = "CLWL"
	elif "Scott" in roomname:
		roomname = "SCOT"
	elif "Brooks" in roomname:
		roomname = "BRKS"
	elif "Collier" in roomname:
		roomname = "COLR"
	elif "Clader" in roomname:
		roomname = "CLAD"
	elif "Chaney" in roomname:
		roomname = "CHAN"
	elif "Prentice" in roomname:		
		roomname = "PREN"
	elif "Williams" in roomname:		
		roomname = "WILM"
	elif "Geffert" in roomname:		
		roomname = "GFRT"
	elif "Page House West" in roomname:
		roomname = "PAGW"
	elif "Page House" in roomname:
		roomname = "PAGE"
	elif "Henrickson" in roomname:		#Unable to find this name in old data, so I made up this abbv.
		roomname = "HENR"
	else:
		pass
	return roomname

def keyToName(roomname):
	'''Replaces abbreviations with corresponding names.'''

	if "NASN" in roomname:
		roomname = "Nason House"
	elif "JAME" in roomname:
		roomname = "James Hall"
	elif "BURT" in roomname:
		roomname = "Burton Hall"
	elif "DAVI" in roomname: 
		roomname = "Davis Hall"
	elif "NOUR" in roomname:
		roomname = "Nourse Hall"
	elif "SEVY" in roomname:
		roomname = "Severance Hall"
	elif "DIXN" in roomname:
		roomname = "Dixon House"
	elif "WATS" in roomname:
		roomname = "Watson Hall"
	elif "OWNS" in roomname:
		roomname = "Owens House"
	elif "DOWH" in roomname:
		roomname = "Dow House"
	elif "EVAN" in roomname:
		roomname = "Evans Hall"
	elif "CASS" in roomname:
		roomname = "Cassat Hall"
	elif "MYER" in roomname:
		roomname = "Myers Hall"
	elif "MUSS" in roomname:
		roomname = "Musser Hall"
	elif "RICE" in roomname:
		roomname = "Rice House"
	elif "GHUE" in roomname:
		roomname = "Goodhue Hall"
	elif "ALLE" in roomname:
		roomname = "Allen House"
	elif "HILL" in roomname:
		roomname = "Hill House"
	elif "FACL" in roomname:
		roomname = "Faculty Club"
	elif "PRSH" in roomname:
		roomname = "Parish House"
	elif "WILS" in roomname:
		roomname = "Wilson House"
	elif "HUNT" in roomname:
		roomname = "Hunt Cottage"
	elif "HNTH" in roomname:
		roomname = "Huntington House"
	elif "EUGS" in roomname:
		roomname = "Eugster House"
	elif "CLWL" in roomname:
		roomname = "Colwell House"
	elif "SCOT" in roomname:
		roomname = "Scott House"
	elif "BRKS" in roomname:
		roomname = "Brooks House"
	elif "COLR" in roomname:
		roomname = "Collier House"
	elif "CLAD" in roomname:
		roomname = "Clader House"
	elif "CHAN" in roomname:
		roomname = "Chaney House"
	elif "PREN" in roomname:		
		roomname = "Prentice House"
	elif "WILM" in roomname:		
		roomname = "Williams House"
	elif "GFRT" in roomname:		
		roomname = "Geffert House"
	elif "PAGW" in roomname:	
		roomname = "Page House West"
	elif "PAGE" in roomname:		
		roomname = "Page House"
	elif "HENR" in roomname:		#Unable to find this name in old data, so I made up this abbv.
		roomname = "Henrickson House"
	else:
		roomname = roomname[:4]
	return roomname