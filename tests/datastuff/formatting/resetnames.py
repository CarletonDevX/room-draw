def main():
	readfile = open('allroomtags.csv', 'r')
	newtext = ''
	for line in readfile:
		values = line.split(",")
		values[10] = values[0][5:]
		newline = ''
		for i in range(len(values)):
			newline += values[i] + ","
		newtext += newline[:-1]
	readfile.close()
	writefile = open('allroomtags1.csv', 'w')
	writefile.write(newtext)
	writefile.close()

if __name__ == "__main__":
	main()