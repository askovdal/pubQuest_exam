from get_route import pubcrawl_route
import time


def benchmark(start, no_bars):
    t1 = time.time()
    pubcrawl_route(start, no_bars, 35)
    t2 = time.time()

    return t2 - t1


addresses = [
    "Harsdorffsvej 2A, 1874 Frederiksberg C",
    "Langebrogade 6A, 1411 København K",
    "Sværtegade 5, 1118 København K",
    "Fælledvej 15, 2200 København N",
    "Julius Valentiners Vej 1, 2000 Frederiksberg",
    "Valdemarsgade 67, 1665 København V",
    "Faksegade 19, 2100 København Ø",
    "Helgolandsgade 21, 1653 København V",
    "Gothersgade 19, 1123 København K",
    "Amagerfælledvej 170, 2300 København S",
]

for bars in range(2, 11):
    times = []
    for address in addresses:
        time_spent = benchmark(address, bars)
        print(time_spent)
        times.append(time_spent)

    print(f"{bars} bars: {sum(times) / len(times)}")
