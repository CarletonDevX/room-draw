'''Uses data from finalroomtags.csv to calculate floor averages and stdevs, then writes them in the file flooravgs.csv
David Pickart 5/3/14'''

import numpy

def buildFloorDict(file):
	'''Builds a dictionary of floors out of a csv file and adds draw numbers to each floor's entry.
	Every entry is of format= floor: [drawnumbers]'''
	next(file) #Skip header
	floordict = {}
	for line in file:
		values = line.split(",")
		roomname, numsused = values[0], values[6]
		numlist = numsused.split(";")
		floor = roomname[:6]
		#print floor, numlist
		if floor not in floordict.keys():
			floordict[floor] = numlist
		else:
			priorlist = floordict[floor]
			newlist = priorlist + numlist
			floordict[floor] = newlist
	#for key in floordict.keys():
	#	print key, floordict[key]
	return floordict

def calculateAndWrite(file, floordict):
	newtext = "FLOOR, AVGNUM, STDEV \n"
	for floor in floordict.keys():
		numlist = convertToNumlist(floordict[floor])
		avg, stdev = findAvgAndStdev(numlist)
		newline = floor + "," + str(avg) + "," + str(stdev) + "\n"
		newtext += newline
	file.write(newtext)
	return

def convertToNumlist(stringlist):
	numlist = []
	for string in stringlist:
		numlist.append(int(string))
	return numlist

def findAvgAndStdev(numlist):
	'''Takes a list of strings and returns the average and standard deviation of those numbers'''
	numsum = 0.0
	for n in numlist:
		numsum += int(n)
	avg = numsum / len(numlist)
	stdev = numpy.std(numlist)
	return avg, stdev

def main():
	readfile = open('finalroomtags.csv', 'r')
	floordict = buildFloorDict(readfile)
	readfile.close()
	writefile = open('flooravg.csv', 'w')
	calculateAndWrite(writefile, floordict)
	writefile.close()

if __name__ == "__main__":
	main()