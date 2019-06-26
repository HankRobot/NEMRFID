import serial

ser = serial.Serial('/dev/ttyUSB0',9600)     #connection to the Arduino

while True:
    got_serial=ser.readline()
    print (got_serial)
    if got_serial[0:4] == b'Got:':
        trans_no = str(got_serial)   #transmission number
        trans_no = trans_no[7:-3]
        print (trans_no)
    
    if got_serial[0:1] == b"D":
        date = str(got_serial)  #the time of submission
        date = date[3:-3]
        print (date)
    
    if got_serial[4:10] == b'kg/m^3':
        dust = str(got_serial)  #dust value
        dust = dust[2:-3]
        print (dust)
        
    if got_serial[4:11] == b'mW/cm^2':
        UV = str(got_serial)  #UV value
        UV = UV[2:-3]
        print (UV)
        
    if got_serial[0:1] == b"B":
        BMI = str(got_serial)   #BMI value
        BMI = BMI[3:-5]
        print (BMI)
    
    if got_serial[0:5] == b'RSSI:':
        RSSI_value = str(got_serial)   #RSSI value
        RSSI_value = RSSI_value[2:-5]
        print (RSSI_value)
    
    