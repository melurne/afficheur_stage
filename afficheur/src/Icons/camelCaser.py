fileName = "uiv2.js"

with open(fileName, "r") as f:
    listeLignes = f.readlines()

listeCameled = []
for line in listeLignes:
    for i in range(len(line)):
        if i< len(line) and line[i] == "-":
            line = line[:i] + line[i+1].upper() + line[i+2:]
            i-=1
    listeCameled.append(line)


with open(fileName, "w") as f:
    for line in listeCameled:
        f.write(line)
