# Import needed modules
import eel

def FT_Write_Data(hashy, content):
    with open('data.txt', 'a+', newline='') as dataFile:
        data =[hashy,str(content),'\n']
        out_data = '-'.join(data)
        dataFile.write(out_data)

def OT_Write_Data(hashy, content):

    d_row = Read_Needed_Row(hashy)
    st_data = '-'.join(d_row)
    with open("data.txt", "r") as file:
        lines = file.readlines()
    with open("data.txt", "w") as file:
        for line in lines:
            if line != st_data:
                file.write(line)
    d_row.pop()
    d_row.append(str(content))
    d_row.append('\n')
    with open('data.txt', 'a+', newline='') as dataFile:
        out_data = '-'.join(d_row)
        dataFile.write(out_data)
        
def Read_Needed_Row(hashy):
    with open('data.txt', 'r') as dataFile:
        data = dataFile.readlines()
        for line in data:
            lineData = line.split('-')
            if lineData[0] == str(hashy):
                return lineData
            else:
                continue
        else:
            return False

def Return_value(hashy):
    data = Read_Needed_Row(hashy)
    if data == False:
        return False
    else:
        element = data[1:]
        element.pop()
        return(element)

@eel.expose # Function is exposed to JavaScript by eel
def main(hashy, action, content):
    
    data = Read_Needed_Row(hashy)
    if str(action)=='r':
        return Return_value(hashy)
    elif str(action)=='w':
        if data==False:
            FT_Write_Data(hashy, content)
        else:
            OT_Write_Data(hashy, content)
    else:
        print('Penetration error occured! Action is not definned!')

if __name__ == "__main__":

    eel.init("ui")
    eel.start("main.html", size=(500,680))