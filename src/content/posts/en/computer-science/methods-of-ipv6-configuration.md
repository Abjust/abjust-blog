---
author: Abjust
pubDatetime: 2026-09-30T00:00:00.000Z
modDatetime: 2026-09-30T00:00:00.000Z
title: On the Methods of IPv6 Configuration
slug: methods-of-ipv6-configuration
featured: false
draft: false
tags:
  - Computer Science
description: How do IPv6 addresses and network settings get configured?
---

## Table of contents

## TL;DR
Speaking strictly of IPv6 address configuration, there are two (automatic) methods: **stateful configuration** and **stateless configuration**.

## Stateful Configuration
Stateful configuration usually refers to **Stateful DHCPv6**, i.e. configuring **IPv6 addresses** and **other network settings** via **DHCPv6**.

The DHCPv6 protocol hands the job of configuring **IPv6 addresses** and **other network settings** (such as **DNSv6** and **NTPv6** servers) to the **router** (or rather, the **DHCPv6 server**). In other words, with stateful configuration, it is the **router** (or the **DHCPv6 server**) that decides how clients get configured.

To use stateful configuration, router advertisements need to carry the **M flag** (meaning **IPv6 addresses** may be configured via **DHCPv6**) and/or the **O flag** (meaning **other IPv6 network settings** may be configured via **DHCPv6**).

With **DHCPv6**, the router (or the **DHCPv6 server**) can **easily manage large networks centrally**. DHCPv6 lets the router decide the **range of IPv6 addresses** (the **address pool**), or hand out the same **DNSv6**, **NTPv6** and **PXEv6** servers to every client. What's more, since **DHCPv6** is a **stateful** protocol, the **router** (or the **DHCPv6 server**) knows **which addresses have been assigned**, can set **lease times** for IPv6 addresses, and can bind **IPv6 addresses** to **device MAC addresses** (much like **DHCPv4**).

The one drawback is that, by **deliberate design** of Android (reportedly to stop mobile carriers from using DHCPv6 to tie **a user's device** to a **unique IPv6 address**; others say **DHCPv6** might bring **NAT66** back from the dead), stateful IPv6 address configuration is still **unsupported** as of **Android 15** (although **third-party solutions** exist for **rooted** phones). **iOS**, by contrast, has supported it since as early as **iOS 4.2**.

## Stateless Configuration
Stateless configuration means **SLAAC** (*Stateless Address Autoconfiguration*).

With stateless configuration, the router uses **IPv6 multicast** to send **Router Advertisements** (RA) to **all IPv6 clients** on the network, carrying the **A flag** (if it is **absent**, **stateless configuration** is **not allowed**), the **IPv6 prefix**, and **IPv6 routing information**.

With this method, the **client** decides how to configure **its own** **IPv6 address**. After receiving the **IPv6 prefix**, the client fills in the **suffix** of the address with **its own 64-bit ID**, and sets the **device that sent the router advertisement** as its **default gateway**. The **64-bit ID** can be **derived from the MAC address**, or be **entirely random**.

Since the router has **no idea how** clients configure their **IPv6 addresses**, an **IPv6 client** avoids **duplicate addresses** by sending a **Neighbor Solicitation** (NS) to ask **all other clients** on the network. If **no** client **responds**, the address is **available**; the client then sends a Neighbor Advertisement (NA) to all other clients, announcing that it is the **owner** of that IPv6 address.

IPv6 clients can rely on a **DNSv4** server for **IPv6** name resolution. That said, under **stateless configuration** there are **two ways** to configure a **DNSv6** server: **RDNSS** (*Recursive DNS Server*, though support is limited) and **DHCPv6** (as long as the **router advertisement** carries the **O flag**). When **SLAAC** is used to configure **IPv6 addresses**, the latter is also called **Stateless DHCPv6**.

## Closing Words
This post isn't of much use, so just treat it as me rambling.
