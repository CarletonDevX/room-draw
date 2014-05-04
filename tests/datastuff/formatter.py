'''
One-time script to copy and format raw data from fall2013.csv and
rawroomdata.csv. Creates two files: roomtags.csv (holds room attributes)
and roomdata.csv (holds draw numbers from each year).
'''

import namereplace


def makeRoomData():
    '''Copies rawroomdata.csv into roomdata.csv, removing the Northfield Option
    and changing MMRL and JAMES to JAME)'''

    newtext = ''
    with open('rawdata/rawroomdata.csv', 'rU') as f:
        for line in f:
            values = line.split(",")
            if 'MMRL' in values[0]:
                values[0] = values[0].replace('MMRL', 'JAME')
            if 'JAMES' in values[0]:
                values[0] = values[0].replace('JAMES', 'JAME')
            newline = ','.join(values[:4]) + '\n'
            if 'NFLD OPT' not in values[0]:
                newtext += newline

    with open('roomdata.csv', 'w+') as f:
        f.write(newtext)


def makeRoomTags():
    '''Changes the names of houses in fall2013.csv and places them into
    roomtags.csv. Abbreviates names, concatenates name and number columns'''

    newtext = ''
    with open('rawdata/fall2013.csv', 'rU') as f:
        for line in f:
            values = line.split(',')
            roomname = values[0]
            newname = namereplace.nameToKey(roomname)  # Replace the name
            newname += ' ' + values[1]
            newline = newname + ',' + ','.join(values[2:7]) + '\n'
            newtext += newline

    with open('roomtags.csv', 'w+') as f:
        f.write(newtext)

#Please don't run me
#if __name__ == '__main__':
#    makeRoomData()
#    makeRoomTags()
