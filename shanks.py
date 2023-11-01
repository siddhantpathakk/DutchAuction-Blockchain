def solve(price):
    maxdiff = abs(price[0] - price[1]) - abs(price[0]//2 - price[1])
    ind = 0
    for i in range(1,len(price)-1):
        olddif = abs(price[i-1] - price[i]) + abs(price[i] - price[i+1])
        newdif = abs(price[i-1] - price[i]//2) + abs(price[i]//2 - price[i+1])
        #print(olddif - newdif)
        #print(f"{price[i-1]} \t {price[i]} \t {price[i+1]}\n")
        if olddif - newdif > maxdiff:
            maxdiff = olddif - newdif
            ind = i
    if abs(price[-1]//2 - price[-2]) > maxdiff: ind = len(price)-1
    #print(f"ind: {ind}")
    cost = 0
    price[ind] = price[ind]//2
    #print(price)
    for i in range(1,len(price)): cost +=abs(price[i-1] - price[i]) 
        #print(abs(price[i-1] - price[i]) + abs(price[i] - price[i+1]))
    return cost


print(solve([22,18,57])) #14
print()
print(solve([1,4,1]))#2
print()
print(solve([12,14,24,12]))#4