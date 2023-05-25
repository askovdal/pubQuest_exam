import matplotlib.pyplot as plt
import seaborn as sns

x_axis = [2, 3, 4, 5, 6, 7, 8, 9, 10]
y_axis = [19.27, 24.51, 29.55, 35.29, 39.59, 45.05, 49.20, 56.29, 59.55]

sns.set_style("darkgrid")
plt.plot(x_axis, y_axis, marker="o")
plt.title("Time spent generating route")
plt.xlabel("Number of bars")
plt.ylabel("Seconds")
plt.show()
