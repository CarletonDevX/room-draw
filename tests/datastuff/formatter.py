'''
One-time script to copy and format raw data from fall2013.csv and
rawroomdata.csv. Creates two files: roomtags.csv (holds room attributes)
and roomdata.csv (holds draw numbers from each year).
David Pickart 4/28/14

Updated:
Matt Cotter 4/3/14
'''

import namereplace


def makeRoomData():
    '''Copies rawroomdata.csv into roomdata.csv, removing the Northfield Option
    and changing MMRL and JAMES to JAME)'''

    with open('rawdata/rawroomdata.csv', 'r') as f:
        newtext = ''
        for line in f:
            values = line.split(",")
            if "MMRL" in values[0]:
                values[0] = values[0].replace("MMRL", "JAME")
            if "JAMES" in values[0]:
                values[0] = values[0].replace("JAMES", "JAME")

            newline = ','.join(values[:4]) + "\n"
            if "NFLD OPT" not in values[0]:
                newtext += newline

    with open("roomdata.csv", "w") as f:
        f.write(newtext)


def makeRoomTags():
    '''Changes the names of houses in fall2013.csv and places them into
    roomtags.csv. Abbreviates names, concatenates name and number columns'''

    file = open('rawdata/fall2013.csv', 'r')
    newtext = ''
    for line in file:
        values = line.split(",")
        roomname = values[0]
        newname = namereplace.nameToKey(roomname)  # Replace the name
        newname += " " + values[1]
        newline = newname + ",".join(values[2:7]) + "\n"
        newtext += newline

    file.close()

    file = open("roomtags.csv", "w")
    file.write(newtext)
    file.close()

if __name__ == "__main__":
    makeRoomData()
    makeRoomTags()
