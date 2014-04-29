'''Uses data from roomdata.csv and roomtags.csv to fill in the columns NUMSUSED, AVGNUM and STDEV in finalroomtags.'''

import numpy

def buildDict(file):
	'''Builds a dictionary of rooms out of a csv file and returns that dictionary.
	Every entry is of format= room: (size,subfree,quiet,mens,womens,numsused,avgnum,stdev)'''
	next(file) #Skip header
	roomdict = {}
	for line in file:
		if line != '\n':
			line = line.rstrip() #Get rid of \r\n's at the end of each line
			values = line.split(",")
			roomname = values[0]

			if not roomname in roomdict.keys():
				roomdict[roomname] = ('', '', '', '', '', values[3], 0, 0)
			else:
				#Compile a list of the numbers used
				numsused = roomdict[roomname][5]
				numsused += ";" + values[3]
				roomdict[roomname] = ('', '', '', '', '', numsused, 0, 0)
				
	#for key in roomdict.keys():
	#	print key, roomdict[key]
	return roomdict

def findAvgStdev(line, usednames, roomdict):
	'''Takes a row of data and returns that row with the avg and stdev columns filled in, as well
	as a running list of rooms that were drawn in 2013.'''
	values = line.split(",")
	roomname = values[0]
	usednames.append(roomname)

	if roomname in roomdict.keys():
		numsused = roomdict[roomname][5]
		individual_nums = numsused.split(";")
		numlist = []
		numsum = 0.0
		for n in individual_nums:
			numsum += int(n)
			numlist.append(int(n))
		avg = numsum / len(individual_nums)
		stdev = numpy.std(numlist)
		newline = roomname + ',' + values[1] + ",'','','',''," + numsused + ',' + str(avg) + ',' + str(stdev) + '\n'
	else:
		newline = line
	return newline, usednames

def columnAdder(readfile, writefile, roomdict):
	'''Adds columns NUMSUSED, AVGNUM and STDEV to a csv file and fills them in with values from a dictionary.'''
	newtext = ''
	usednames = []
	next(readfile) #Skip header

	#Go through roomtags and get info for each room
	for line in readfile:
		line = line.rstrip() #Get rid of \r\n's at the end of each line
		newline, usednames = findAvgStdev(line, usednames, roomdict)
		newtext += newline

	#newtext += "END OF ROOMS DRAWN IN 2013,,,,,,,, \n"

	#Add rooms not drawn last year

	for key in roomdict.keys():
		if key not in usednames:
			line = key + "," + str(roomdict[key])[1:-1]
			newline, usednames = findAvgStdev(line, usednames, roomdict)
			newtext += newline

	newtext = "HOUSENAME,SIZE,SUBFREE,QUIET,MENS,WOMENS,NUMSUSED,AVGNUM,STDEV\n" + newtext
	writefile.write(newtext)
	return

def main():
	file = open('roomdata.csv', 'r')
	roomdict = buildDict(file)
	file.close()
	readfile = open('roomtags.csv', 'r')
	writefile = open('finalroomtags.csv', 'w')
	columnAdder(readfile, writefile, roomdict)
	readfile.close()
	writefile.close()

if __name__ == "__main__":
	main()
