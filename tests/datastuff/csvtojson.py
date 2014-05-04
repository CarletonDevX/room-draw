'''
Take the final room tags csv and convert to json.
'''
import sys


def main(outfile):
    dorms = {}
    with open('finalroomtags.csv') as csvin:
        csvin.readline()
        for line in csvin:
            _, size, subFree, quiet, onlyMale, onlyFemale, _, mean, \
                stdev, hall, name, _, _ = line.split(',')
            subFree = (subFree == 'True')
            quiet = (quiet == 'True')
            onlyMale = (onlyMale == 'True')
            onlyFemale = (onlyFemale == 'True')
            rdict = {
                "size": size,
                "subFree": subFree,
                "quiet": quiet,
                "onlyFemale": onlyFemale,
                "onlyMale": onlyMale,
                "name": name,
                "chance": {
                    "mean": mean,
                    "stdev": stdev,
                    "offset": 0
                },
                "isDrawn": False
            }
            floor = int(name[0])
            # Have we seen this hall?
            if hall not in dorms.keys():
                # if not add it
                dorms[hall] = []
            # Have we seen this floor?
            hasFloor = False
            for found in dorms[hall]:
                if found['number'] == floor:
                    hasFloor = True
                    break
            if hasFloor:
                found['rooms'].append(rdict)
            if not hasFloor:
                # add this floor with empty room list
                dorms[hall].append({
                    'number': floor,
                    'rooms': [rdict]
                })
    dstring = '['
    for name, floors in dorms.iteritems():
        hallstr = '{"name":' + name + ',"floors":'
        hallstr += str(floors).replace("'", '"')
        hallstr += '},'
        dstring += hallstr
    dstring = dstring[:-1] + ']\n'
    outfile.write(dstring)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'w+') as outfile:
            main(outfile)
    else:
        main(sys.stdout)
