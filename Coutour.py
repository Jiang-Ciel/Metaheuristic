import matplotlib.pyplot as plt
import numpy as np

# 定义等高线高度函数
# def f(X, Y):
    # A = 10
    # return 2 * A + X ** 2 - A * np.cos(2 * np.pi * X) + Y ** 2 - A * np.cos(2 * np.pi * Y)
def draw_pic(Inputs):
    Z,title = Inputs
    z_min = 0
    plt.figure(title)
    # 填充等高线的颜色, 8是等高线分为几部分
    plt.contourf(X, Y, Z, 10, alpha = 0.75, cmap = plt.cm.jet)
    # 绘制等高线
    C = plt.contour(X, Y, Z, 10, colors = 'black', linewidth = 0.5)
    # 绘制等高线数据
    plt.clabel(C, inline = True, fontsize = 10)

    # 去除坐标轴
    plt.xticks(())
    plt.yticks(())
    # plt.savefig("./test_functions/pic/%s.png" % title) # save figures


def get_X_AND_Y(X_min, X_max, Y_min, Y_max):
    X = np.arange(X_min, X_max, 0.1)
    Y = np.arange(Y_min, Y_max, 0.1)
    X, Y = np.meshgrid(X, Y)
    return X, Y


#  rastrigin测试函数
def Rastrigin(X,Y):
    A = 10
    return 2 * A + X ** 2 - A * np.cos(2 * np.pi * X) + Y ** 2 - A * np.cos(2 * np.pi * Y),"Rastrigin"
    


# Ackley测试函数
def Ackley(X,Y):
    return -20 * np.exp(-0.2 * np.sqrt(0.5 * (X**2 + Y**2))) - \
        np.exp(0.5 * (np.cos(2 * np.pi * X) + np.cos(2 * np.pi * Y))) + np.e + 20, "Ackley"


# Sphere测试函数
def Sphere(X, Y):
    return X**2 + Y**2, "Sphere"


#  beale测试函数
def Beale(X,Y):
    Z = np.power(1.5 - X + X * Y, 2) + np.power(2.25 - X + X * (Y ** 2), 2) \
        + np.power(2.625 - X + X * (Y ** 3), 2)
    return Z, "Beale function"


# Booth测试函数
def Booth(X, Y):
    Z = np.power(X + 2*Y - 7, 2) + np.power(2 * X + Y - 5, 2)
    return Z, "Booth function"


# Bukin测试函数
def Bukin(X, Y):
    Z = 100 * np.sqrt(np.abs(Y - 0.01 * X**2)) + 0.01 * np.abs(X + 10)
    return Z, "Bukin function"


#  Three-hump camel测试函数
def three_humpCamel(X, Y):
    Z = 2 * X**2 - 1.05 * X**4 + (1/6) * X**6 + X*Y + Y*2
    return Z, "three-hump camel function"


# # Hölder table测试函数
# def Holder_table(X_min = -10, X_max = 10, Y_min = -10, Y_max = 10):
#     X, Y = get_X_AND_Y(X_min, X_max, Y_min, Y_max)
#     Z = -np.abs(np.sin(X) * np.cos(Y) * np.exp(np.abs(1 - np.sqrt(X**2 + Y**2)/np.pi)))
#     return X, Y, Z, 0, "Hölder table function", -20



z_min = None
# 数据数目
n = 256
# 定义x, y
x = np.linspace(-1.5, 1.5, n)
y = np.linspace(-1.5, 1.5, n)

# 生成网格数据
X, Y = np.meshgrid(x, y)
Functions=[Rastrigin(X,Y),Ackley(X,Y),Sphere(X,Y),Beale(X,Y),Booth(X,Y),Bukin(X,Y),three_humpCamel(X,Y)]
for i in range(len(Functions)):
    draw_pic(Functions[i])
plt.show()


# # 填充等高线的颜色, 8是等高线分为几部分
# plt.contourf(X, Y, f(X, Y), 10, alpha = 0.75, cmap = plt.cm.jet)
# # 绘制等高线
# C = plt.contour(X, Y, f(X, Y), 10, colors = 'black', linewidth = 0.5)
# # 绘制等高线数据
# plt.clabel(C, inline = True, fontsize = 10)

# # 去除坐标轴
# plt.xticks(())
# plt.yticks(())
# plt.show()