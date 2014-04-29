'''Trying because my other homework sucks!-Emily'''

def average():
  '''Inputs the average of a list of draw orders.'''
  
  file = open('roomdata.csv','r')
  d={}
  newtext=''
  
  for line in file:
    values = line.split(",") #creating a list of RM Name, Term, Draw Number, Draw Order per line
    name = values[0]
  
    if !d.hasKey(name):
      d[name] = [values[3],1]
    else:
      existVals = d.getvalue(name)
      existVals[0]+=values[4]
      existVals[1]+=1
    
  file.close()
  
  d.sorted()
  stuff=d.items()
  
  for item in stuff:
    average=float(item[1])/item[2]
    newline=stuff[0]+ "," + average +"," + "\n"
    newtext+=newline
  
  file = open("roomCalcs.csv","w")
  file.write(newtext)
  file.close()
  
if __name__ == "__main__":
  average()
