def setPropsD(arr):
    chartWidth = 300 * 0.8
    chartHeight = 170 * 0.6
    intervalX = chartWidth/len(arr)
    maxPrice = max(arr)[0]
    minPrice = min(arr)[0]
    acc = ''
    for idx in range(0, len(arr)) :
        if idx==0 :
            acc = 'M' + str(intervalX*idx+30) + ' ' + str((1-(arr[idx][0]-minPrice)/(maxPrice-minPrice))*(chartHeight) +17)
        else :
            acc = acc + ' L' + str(intervalX*idx+30) + ' ' + str((1-(arr[idx][0]-minPrice)/(maxPrice-minPrice))*(chartHeight)+17)
    
    return acc