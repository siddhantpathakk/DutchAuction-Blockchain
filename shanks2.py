def solve(data, k):
    data.sort()

    summ = 0
    cost = 0
    for i in range(0,len(data),2):
        summ+=data[i]
    print()
    print(data)
    print(summ)
    ind = 0
    while summ < k:
        summ = summ - data[ind] + data[-ind-1]
        ind+=2
        cost+=1
        if ind > len(data)-1:
            return -1
    return ind-1
print(solve([3,1,5,2],6)) #1
print(solve([10,30,15,25],100)) #-1
print(solve([2,5,1,7,3,8],14)) #-1
print(solve([2,1,4,8,5,6,7,3],24)) #3
