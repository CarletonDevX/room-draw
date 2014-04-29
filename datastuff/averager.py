'''Don't have github installed on the computer I'm working on, so going to run/catch bugs on this code at like 8:45pm Monday.-Emily'''

def average(list):
'''Returns the average of the draw order for a room.'''
  sum=0.0
  for item in list:
    sum+=item
  return sum/len(list)  
  
def stdev(list):
'''Returns the standard deviation of the draw order for a room.'''  
  avg=average(list)
  sum=0.0
  for item in list:
    sum+=(item-avg)**(2)
  return (sum/len(list))**(0.5)
  
def main():  
  '''Opens roomdata.csv. Sorts information into a dictionary. Calls avg, stdev functions. Writes to roomCalcs.csv.'''
  
  file = open('roomdata.csv','r')
  
  '''Woot dictionaries. Sherri would be proud.'''
  d={}
  newtext=''
  
  for line in file:
    values = line.split(",") #creating a list of RM Name, Term, Draw Number, Draw Order per line
    name = values[0]
  
    if !d.hasKey(name):
      d[name] = [values[3]]
    else:
      existVals = d.getvalue(name)
      values[3].append(existVals)
    
  file.close()
  
  '''Data is way more fun when sorted!'''
  d.sorted()
  stuff=d.items()
  
  '''Writing name, average, standard deviation to new file.'''
  for item in stuff:
    newline=item[0]+ "," + average(item[1]) +"," + stdev(item[1]) + "\n"
    newtext+=newline
  
  file = open("roomCalcs.csv","w")
  file.write(newtext)
  file.close()
  
if __name__ == "__main__":
  main()
