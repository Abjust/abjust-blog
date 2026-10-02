---
author: Abjust
pubDatetime: 2026-09-30T00:00:00.000Z
modDatetime: 2026-09-30T00:00:00.000Z
title: 洛必达法则
slug: l'hospital's-rule
featured: false
draft: true
tags:
  - 学习心得
  - 微积分
description: 怎么用导数求极限？
---

## 什么是不定式？

假设有两个函数：$f(x)$ 和 $g(x)$，让它们相除，得到 $\frac{f(x)}{g(x)}$。

当 x 趋近于 a 时，$\lim_{x \to a}  f(x) = 0$，且 $\lim_{x \to a}  g(x) = 0$，此时就得到了其中一种不定式：$\frac{0}{0}$。

不定式是指按照极限的运算规则代入的时候，还不能够确定极限值的情况。

除了前面提到的$\frac{0}{0}$，$\frac{\infty}{\infty}$、$0 \times \infty$、$1^\infty$、$\infty - \infty$、$0^0$、$\infty^0$也都属于不定式。

## 什么是洛必达法则？

如果 $f(x)$ 和 $g(x)$ 在同一个开区间皆可导，则可得：

$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}
$$

## 什么时候可以用洛必达法则？

如果 $\lim_{x \to a} \frac{f(x)}{g(x)}$ 会得到 $\frac{0}{0}$ 或者 $\frac{\infty}{\infty}$ 这二者之一，且 $g'(x) \ne 0$，则可以用洛必达法则计算极限。

如果得到其他形式的不定式，则需要将其化为$\frac{0}{0}$ 或者 $\frac{\infty}{\infty}$ 的形式。

## 怎么转化不定式？

