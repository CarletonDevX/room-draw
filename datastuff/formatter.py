'''One-time script to copy and format raw data from fall2013.csv and rawroomdata.csv. 
Creates two files: roomtags.csv (holds room attributes) and roomdata.csv (holds draw numbers from each year).
David Pickart 4/28/14'''

def makeRoomData():
	'''Copies rawroomdata.csv into roomdata.csv, removing the Northfield Option in the process.'''

	file = open('rawdata/rawroomdata.csv', 'r')
	newtext = ''

	for line in file:
		values = line.split(",")
		if values[0] != "NFLD OPT":
			newtext += line

	file.close()

	file = open("roomdata.csv", "w")
	file.write(newtext)
	file.close()

def makeRoomTags():
	'''Changes the names of houses in fall2013.csv and places them into roomtags.csv. 
	Abbreviates names, concatenates name and number columns, and removes the Northfield Option.'''

	file = open('rawdata/fall2013.csv', 'r')
	newtext = ''

	for line in file:
		values = line.split(",")
		roomname = values[0]
		newname = replacer(roomname) #Replace the name
		newname += " " + values[1]
		newline = newname + "," + values[2] + "," + values[3] + "," + values[4] + "," + values[5] + "," + values[6] + "\n"
		
		if newname != "Northfield Option":
			newtext += newline

	file.close()

	file = open("roomtags.csv", "w")
	file.write(newtext)
	file.close()


def replacer(roomname):
	'''Replaces names with corresponding abbreviations.'''

	if "Nason" in roomname:
		roomname = "NASN"
	elif "James" in roomname:
		roomname = "JAMES"
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
	elif "Henrickson" in roomname:		#Unable to find this name in old data, so I made up this abbv.
		roomname = "HENR"
	elif "Page House" in roomname:		#Same as above
		roomname = "PAGE"
	else:
		pass

	return roomname

if __name__ == "__main__":
	makeRoomData()
	makeRoomTags()


