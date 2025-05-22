// (function () {
//   function n(n) {
//     function r(r, t, e, u, i, o) {
//       for (; i >= 0 && o > i; i += n) {
//         var a = u ? u[i] : i;
//         e = t(e, r[a], a, r);
//       }
//       return e;
//     }
//     return function (t, e, u, i) {
//       e = b(e, i, 4);
//       var o = !k(t) && m.keys(t),
//         a = (o || t).length,
//         c = n > 0 ? 0 : a - 1;
//       return (
//         arguments.length < 3 && ((u = t[o ? o[c] : c]), (c += n)),
//         r(t, e, u, o, c, a)
//       );
//     };
//   }
//   function r(n) {
//     return function (r, t, e) {
//       t = x(t, e);
//       for (var u = O(r), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
//         if (t(r[i], i, r)) return i;
//       return -1;
//     };
//   }
//   function t(n, r, t) {
//     return function (e, u, i) {
//       var o = 0,
//         a = O(e);
//       if ('number' == typeof i)
//         n > 0
//           ? (o = i >= 0 ? i : Math.max(i + a, o))
//           : (a = i >= 0 ? Math.min(i + 1, a) : i + a + 1);
//       else if (t && i && a) return e[(i = t(e, u))] === u ? i : -1;
//       if (u != u) return (i = r(l.call(e, o, a), m.isNaN)) >= 0 ? i + o : -1;
//       for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
//         if (e[i] === u) return i;
//       return -1;
//     };
//   }
//   function e(n, r) {
//     var t = I.length,
//       e = n.constructor,
//       u = (m.isFunction(e) && e.prototype) || a,
//       i = 'constructor';
//     for (m.has(n, i) && !m.contains(r, i) && r.push(i); t--; )
//       (i = I[t]) in n && n[i] !== u[i] && !m.contains(r, i) && r.push(i);
//   }
//   var u = this,
//     i = u._,
//     o = Array.prototype,
//     a = Object.prototype,
//     c = Function.prototype,
//     f = o.push,
//     l = o.slice,
//     s = a.toString,
//     p = a.hasOwnProperty,
//     h = Array.isArray,
//     v = Object.keys,
//     y = c.bind,
//     d = Object.create,
//     g = function () {},
//     m = function (n) {
//       return n instanceof m
//         ? n
//         : this instanceof m
//           ? void (this._wrapped = n)
//           : new m(n);
//     };
//   'undefined' != typeof exports
//     ? ('undefined' != typeof module &&
//         module.exports &&
//         (exports = module.exports = m),
//       (exports._ = m))
//     : (u._ = m),
//     (m.VERSION = '1.8.3');
//   var b = function (n, r, t) {
//       if (void 0 === r) return n;
//       switch (null == t ? 3 : t) {
//         case 1:
//           return function (t) {
//             return n.call(r, t);
//           };
//         case 2:
//           return function (t, e) {
//             return n.call(r, t, e);
//           };
//         case 3:
//           return function (t, e, u) {
//             return n.call(r, t, e, u);
//           };
//         case 4:
//           return function (t, e, u, i) {
//             return n.call(r, t, e, u, i);
//           };
//       }
//       return function () {
//         return n.apply(r, arguments);
//       };
//     },
//     x = function (n, r, t) {
//       return null == n
//         ? m.identity
//         : m.isFunction(n)
//           ? b(n, r, t)
//           : m.isObject(n)
//             ? m.matcher(n)
//             : m.property(n);
//     };
//   m.iteratee = function (n, r) {
//     return x(n, r, 1 / 0);
//   };
//   var _ = function (n, r) {
//       return function (t) {
//         var e = arguments.length;
//         if (2 > e || null == t) return t;
//         for (var u = 1; e > u; u++)
//           for (
//             var i = arguments[u], o = n(i), a = o.length, c = 0;
//             a > c;
//             c++
//           ) {
//             var f = o[c];
//             (r && void 0 !== t[f]) || (t[f] = i[f]);
//           }
//         return t;
//       };
//     },
//     j = function (n) {
//       if (!m.isObject(n)) return {};
//       if (d) return d(n);
//       g.prototype = n;
//       var r = new g();
//       return (g.prototype = null), r;
//     },
//     w = function (n) {
//       return function (r) {
//         return null == r ? void 0 : r[n];
//       };
//     },
//     A = Math.pow(2, 53) - 1,
//     O = w('length'),
//     k = function (n) {
//       var r = O(n);
//       return 'number' == typeof r && r >= 0 && A >= r;
//     };
//   (m.each = m.forEach =
//     function (n, r, t) {
//       var e, u;
//       if (((r = b(r, t)), k(n)))
//         for (e = 0, u = n.length; u > e; e++) r(n[e], e, n);
//       else {
//         var i = m.keys(n);
//         for (e = 0, u = i.length; u > e; e++) r(n[i[e]], i[e], n);
//       }
//       return n;
//     }),
//     (m.map = m.collect =
//       function (n, r, t) {
//         r = x(r, t);
//         for (
//           var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0;
//           u > o;
//           o++
//         ) {
//           var a = e ? e[o] : o;
//           i[o] = r(n[a], a, n);
//         }
//         return i;
//       }),
//     (m.reduce = m.foldl = m.inject = n(1)),
//     (m.reduceRight = m.foldr = n(-1)),
//     (m.find = m.detect =
//       function (n, r, t) {
//         var e;
//         return void 0 !==
//           (e = k(n) ? m.findIndex(n, r, t) : m.findKey(n, r, t)) && -1 !== e
//           ? n[e]
//           : void 0;
//       }),
//     (m.filter = m.select =
//       function (n, r, t) {
//         var e = [];
//         return (
//           (r = x(r, t)),
//           m.each(n, function (n, t, u) {
//             r(n, t, u) && e.push(n);
//           }),
//           e
//         );
//       }),
//     (m.reject = function (n, r, t) {
//       return m.filter(n, m.negate(x(r)), t);
//     }),
//     (m.every = m.all =
//       function (n, r, t) {
//         r = x(r, t);
//         for (
//           var e = !k(n) && m.keys(n), u = (e || n).length, i = 0;
//           u > i;
//           i++
//         ) {
//           var o = e ? e[i] : i;
//           if (!r(n[o], o, n)) return !1;
//         }
//         return !0;
//       }),
//     (m.some = m.any =
//       function (n, r, t) {
//         r = x(r, t);
//         for (
//           var e = !k(n) && m.keys(n), u = (e || n).length, i = 0;
//           u > i;
//           i++
//         ) {
//           var o = e ? e[i] : i;
//           if (r(n[o], o, n)) return !0;
//         }
//         return !1;
//       }),
//     (m.contains =
//       m.includes =
//       m.include =
//         function (n, r, t, e) {
//           return (
//             k(n) || (n = m.values(n)),
//             ('number' != typeof t || e) && (t = 0),
//             m.indexOf(n, r, t) >= 0
//           );
//         }),
//     (m.invoke = function (n, r) {
//       var t = l.call(arguments, 2),
//         e = m.isFunction(r);
//       return m.map(n, function (n) {
//         var u = e ? r : n[r];
//         return null == u ? u : u.apply(n, t);
//       });
//     }),
//     (m.pluck = function (n, r) {
//       return m.map(n, m.property(r));
//     }),
//     (m.where = function (n, r) {
//       return m.filter(n, m.matcher(r));
//     }),
//     (m.findWhere = function (n, r) {
//       return m.find(n, m.matcher(r));
//     }),
//     (m.max = function (n, r, t) {
//       var e,
//         u,
//         i = -1 / 0,
//         o = -1 / 0;
//       if (null == r && null != n)
//         for (var a = 0, c = (n = k(n) ? n : m.values(n)).length; c > a; a++)
//           (e = n[a]) > i && (i = e);
//       else
//         (r = x(r, t)),
//           m.each(n, function (n, t, e) {
//             ((u = r(n, t, e)) > o || (u === -1 / 0 && i === -1 / 0)) &&
//               ((i = n), (o = u));
//           });
//       return i;
//     }),
//     (m.min = function (n, r, t) {
//       var e,
//         u,
//         i = 1 / 0,
//         o = 1 / 0;
//       if (null == r && null != n)
//         for (var a = 0, c = (n = k(n) ? n : m.values(n)).length; c > a; a++)
//           (e = n[a]), i > e && (i = e);
//       else
//         (r = x(r, t)),
//           m.each(n, function (n, t, e) {
//             (u = r(n, t, e)),
//               (o > u || (1 / 0 === u && 1 / 0 === i)) && ((i = n), (o = u));
//           });
//       return i;
//     }),
//     (m.shuffle = function (n) {
//       for (
//         var r, t = k(n) ? n : m.values(n), e = t.length, u = Array(e), i = 0;
//         e > i;
//         i++
//       )
//         (r = m.random(0, i)) !== i && (u[i] = u[r]), (u[r] = t[i]);
//       return u;
//     }),
//     (m.sample = function (n, r, t) {
//       return null == r || t
//         ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)])
//         : m.shuffle(n).slice(0, Math.max(0, r));
//     }),
//     (m.sortBy = function (n, r, t) {
//       return (
//         (r = x(r, t)),
//         m.pluck(
//           m
//             .map(n, function (n, t, e) {
//               return {
//                 value: n,
//                 index: t,
//                 criteria: r(n, t, e),
//               };
//             })
//             .sort(function (n, r) {
//               var t = n.criteria,
//                 e = r.criteria;
//               if (t !== e) {
//                 if (t > e || void 0 === t) return 1;
//                 if (e > t || void 0 === e) return -1;
//               }
//               return n.index - r.index;
//             }),
//           'value'
//         )
//       );
//     });
//   var F = function (n) {
//     return function (r, t, e) {
//       var u = {};
//       return (
//         (t = x(t, e)),
//         m.each(r, function (e, i) {
//           var o = t(e, i, r);
//           n(u, e, o);
//         }),
//         u
//       );
//     };
//   };
//   (m.groupBy = F(function (n, r, t) {
//     m.has(n, t) ? n[t].push(r) : (n[t] = [r]);
//   })),
//     (m.indexBy = F(function (n, r, t) {
//       n[t] = r;
//     })),
//     (m.countBy = F(function (n, r, t) {
//       m.has(n, t) ? n[t]++ : (n[t] = 1);
//     })),
//     (m.toArray = function (n) {
//       return n
//         ? m.isArray(n)
//           ? l.call(n)
//           : k(n)
//             ? m.map(n, m.identity)
//             : m.values(n)
//         : [];
//     }),
//     (m.size = function (n) {
//       return null == n ? 0 : k(n) ? n.length : m.keys(n).length;
//     }),
//     (m.partition = function (n, r, t) {
//       r = x(r, t);
//       var e = [],
//         u = [];
//       return (
//         m.each(n, function (n, t, i) {
//           (r(n, t, i) ? e : u).push(n);
//         }),
//         [e, u]
//       );
//     }),
//     (m.first =
//       m.head =
//       m.take =
//         function (n, r, t) {
//           return null == n
//             ? void 0
//             : null == r || t
//               ? n[0]
//               : m.initial(n, n.length - r);
//         }),
//     (m.initial = function (n, r, t) {
//       return l.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)));
//     }),
//     (m.last = function (n, r, t) {
//       return null == n
//         ? void 0
//         : null == r || t
//           ? n[n.length - 1]
//           : m.rest(n, Math.max(0, n.length - r));
//     }),
//     (m.rest =
//       m.tail =
//       m.drop =
//         function (n, r, t) {
//           return l.call(n, null == r || t ? 1 : r);
//         }),
//     (m.compact = function (n) {
//       return m.filter(n, m.identity);
//     });
//   var S = function (n, r, t, e) {
//     for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
//       var c = n[o];
//       if (k(c) && (m.isArray(c) || m.isArguments(c))) {
//         r || (c = S(c, r, t));
//         var f = 0,
//           l = c.length;
//         for (u.length += l; l > f; ) u[i++] = c[f++];
//       } else t || (u[i++] = c);
//     }
//     return u;
//   };
//   (m.flatten = function (n, r) {
//     return S(n, r, !1);
//   }),
//     (m.without = function (n) {
//       return m.difference(n, l.call(arguments, 1));
//     }),
//     (m.uniq = m.unique =
//       function (n, r, t, e) {
//         m.isBoolean(r) || ((e = t), (t = r), (r = !1)),
//           null != t && (t = x(t, e));
//         for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
//           var c = n[o],
//             f = t ? t(c, o, n) : c;
//           r
//             ? ((o && i === f) || u.push(c), (i = f))
//             : t
//               ? m.contains(i, f) || (i.push(f), u.push(c))
//               : m.contains(u, c) || u.push(c);
//         }
//         return u;
//       }),
//     (m.union = function () {
//       return m.uniq(S(arguments, !0, !0));
//     }),
//     (m.intersection = function (n) {
//       for (var r = [], t = arguments.length, e = 0, u = O(n); u > e; e++) {
//         var i = n[e];
//         if (!m.contains(r, i)) {
//           for (var o = 1; t > o && m.contains(arguments[o], i); o++);
//           o === t && r.push(i);
//         }
//       }
//       return r;
//     }),
//     (m.difference = function (n) {
//       var r = S(arguments, !0, !0, 1);
//       return m.filter(n, function (n) {
//         return !m.contains(r, n);
//       });
//     }),
//     (m.zip = function () {
//       return m.unzip(arguments);
//     }),
//     (m.unzip = function (n) {
//       for (
//         var r = (n && m.max(n, O).length) || 0, t = Array(r), e = 0;
//         r > e;
//         e++
//       )
//         t[e] = m.pluck(n, e);
//       return t;
//     }),
//     (m.object = function (n, r) {
//       for (var t = {}, e = 0, u = O(n); u > e; e++)
//         r ? (t[n[e]] = r[e]) : (t[n[e][0]] = n[e][1]);
//       return t;
//     }),
//     (m.findIndex = r(1)),
//     (m.findLastIndex = r(-1)),
//     (m.sortedIndex = function (n, r, t, e) {
//       for (var u = (t = x(t, e, 1))(r), i = 0, o = O(n); o > i; ) {
//         var a = Math.floor((i + o) / 2);
//         t(n[a]) < u ? (i = a + 1) : (o = a);
//       }
//       return i;
//     }),
//     (m.indexOf = t(1, m.findIndex, m.sortedIndex)),
//     (m.lastIndexOf = t(-1, m.findLastIndex)),
//     (m.range = function (n, r, t) {
//       null == r && ((r = n || 0), (n = 0)), (t = t || 1);
//       for (
//         var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), i = 0;
//         e > i;
//         i++, n += t
//       )
//         u[i] = n;
//       return u;
//     });
//   var E = function (n, r, t, e, u) {
//     if (!(e instanceof r)) return n.apply(t, u);
//     var i = j(n.prototype),
//       o = n.apply(i, u);
//     return m.isObject(o) ? o : i;
//   };
//   (m.bind = function (n, r) {
//     if (y && n.bind === y) return y.apply(n, l.call(arguments, 1));
//     if (!m.isFunction(n))
//       throw new TypeError('Bind must be called on a function');
//     var t = l.call(arguments, 2),
//       e = function () {
//         return E(n, e, r, this, t.concat(l.call(arguments)));
//       };
//     return e;
//   }),
//     (m.partial = function (n) {
//       var r = l.call(arguments, 1),
//         t = function () {
//           for (var e = 0, u = r.length, i = Array(u), o = 0; u > o; o++)
//             i[o] = r[o] === m ? arguments[e++] : r[o];
//           for (; e < arguments.length; ) i.push(arguments[e++]);
//           return E(n, t, this, this, i);
//         };
//       return t;
//     }),
//     (m.bindAll = function (n) {
//       var r,
//         t,
//         e = arguments.length;
//       if (1 >= e) throw new Error('bindAll must be passed function names');
//       for (r = 1; e > r; r++) n[(t = arguments[r])] = m.bind(n[t], n);
//       return n;
//     }),
//     (m.memoize = function (n, r) {
//       var t = function (e) {
//         var u = t.cache,
//           i = '' + (r ? r.apply(this, arguments) : e);
//         return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i];
//       };
//       return (t.cache = {}), t;
//     }),
//     (m.delay = function (n, r) {
//       var t = l.call(arguments, 2);
//       return setTimeout(function () {
//         return n.apply(null, t);
//       }, r);
//     }),
//     (m.defer = m.partial(m.delay, m, 1)),
//     (m.throttle = function (n, r, t) {
//       var e,
//         u,
//         i,
//         o = null,
//         a = 0;
//       t || (t = {});
//       var c = function () {
//         (a = !1 === t.leading ? 0 : m.now()),
//           (o = null),
//           (i = n.apply(e, u)),
//           o || (e = u = null);
//       };
//       return function () {
//         var f = m.now();
//         a || !1 !== t.leading || (a = f);
//         var l = r - (f - a);
//         return (
//           (e = this),
//           (u = arguments),
//           0 >= l || l > r
//             ? (o && (clearTimeout(o), (o = null)),
//               (a = f),
//               (i = n.apply(e, u)),
//               o || (e = u = null))
//             : o || !1 === t.trailing || (o = setTimeout(c, l)),
//           i
//         );
//       };
//     }),
//     (m.debounce = function (n, r, t) {
//       var e,
//         u,
//         i,
//         o,
//         a,
//         c = function () {
//           var f = m.now() - o;
//           r > f && f >= 0
//             ? (e = setTimeout(c, r - f))
//             : ((e = null), t || ((a = n.apply(i, u)), e || (i = u = null)));
//         };
//       return function () {
//         (i = this), (u = arguments), (o = m.now());
//         var f = t && !e;
//         return (
//           e || (e = setTimeout(c, r)),
//           f && ((a = n.apply(i, u)), (i = u = null)),
//           a
//         );
//       };
//     }),
//     (m.wrap = function (n, r) {
//       return m.partial(r, n);
//     }),
//     (m.negate = function (n) {
//       return function () {
//         return !n.apply(this, arguments);
//       };
//     }),
//     (m.compose = function () {
//       var n = arguments,
//         r = n.length - 1;
//       return function () {
//         for (var t = r, e = n[r].apply(this, arguments); t--; )
//           e = n[t].call(this, e);
//         return e;
//       };
//     }),
//     (m.after = function (n, r) {
//       return function () {
//         return --n < 1 ? r.apply(this, arguments) : void 0;
//       };
//     }),
//     (m.before = function (n, r) {
//       var t;
//       return function () {
//         return (
//           --n > 0 && (t = r.apply(this, arguments)), 1 >= n && (r = null), t
//         );
//       };
//     }),
//     (m.once = m.partial(m.before, 2));
//   var M = !{
//       toString: null,
//     }.propertyIsEnumerable('toString'),
//     I = [
//       'valueOf',
//       'isPrototypeOf',
//       'toString',
//       'propertyIsEnumerable',
//       'hasOwnProperty',
//       'toLocaleString',
//     ];
//   (m.keys = function (n) {
//     if (!m.isObject(n)) return [];
//     if (v) return v(n);
//     var r = [];
//     for (var t in n) m.has(n, t) && r.push(t);
//     return M && e(n, r), r;
//   }),
//     (m.allKeys = function (n) {
//       if (!m.isObject(n)) return [];
//       var r = [];
//       for (var t in n) r.push(t);
//       return M && e(n, r), r;
//     }),
//     (m.values = function (n) {
//       for (var r = m.keys(n), t = r.length, e = Array(t), u = 0; t > u; u++)
//         e[u] = n[r[u]];
//       return e;
//     }),
//     (m.mapObject = function (n, r, t) {
//       r = x(r, t);
//       for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)
//         o[(e = u[a])] = r(n[e], e, n);
//       return o;
//     }),
//     (m.pairs = function (n) {
//       for (var r = m.keys(n), t = r.length, e = Array(t), u = 0; t > u; u++)
//         e[u] = [r[u], n[r[u]]];
//       return e;
//     }),
//     (m.invert = function (n) {
//       for (var r = {}, t = m.keys(n), e = 0, u = t.length; u > e; e++)
//         r[n[t[e]]] = t[e];
//       return r;
//     }),
//     (m.functions = m.methods =
//       function (n) {
//         var r = [];
//         for (var t in n) m.isFunction(n[t]) && r.push(t);
//         return r.sort();
//       }),
//     (m.extend = _(m.allKeys)),
//     (m.extendOwn = m.assign = _(m.keys)),
//     (m.findKey = function (n, r, t) {
//       r = x(r, t);
//       for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
//         if (r(n[(e = u[i])], e, n)) return e;
//     }),
//     (m.pick = function (n, r, t) {
//       var e,
//         u,
//         i = {},
//         o = n;
//       if (null == o) return i;
//       m.isFunction(r)
//         ? ((u = m.allKeys(o)), (e = b(r, t)))
//         : ((u = S(arguments, !1, !1, 1)),
//           (e = function (n, r, t) {
//             return r in t;
//           }),
//           (o = Object(o)));
//       for (var a = 0, c = u.length; c > a; a++) {
//         var f = u[a],
//           l = o[f];
//         e(l, f, o) && (i[f] = l);
//       }
//       return i;
//     }),
//     (m.omit = function (n, r, t) {
//       if (m.isFunction(r)) r = m.negate(r);
//       else {
//         var e = m.map(S(arguments, !1, !1, 1), String);
//         r = function (n, r) {
//           return !m.contains(e, r);
//         };
//       }
//       return m.pick(n, r, t);
//     }),
//     (m.defaults = _(m.allKeys, !0)),
//     (m.create = function (n, r) {
//       var t = j(n);
//       return r && m.extendOwn(t, r), t;
//     }),
//     (m.clone = function (n) {
//       return m.isObject(n) ? (m.isArray(n) ? n.slice() : m.extend({}, n)) : n;
//     }),
//     (m.tap = function (n, r) {
//       return r(n), n;
//     }),
//     (m.isMatch = function (n, r) {
//       var t = m.keys(r),
//         e = t.length;
//       if (null == n) return !e;
//       for (var u = Object(n), i = 0; e > i; i++) {
//         var o = t[i];
//         if (r[o] !== u[o] || !(o in u)) return !1;
//       }
//       return !0;
//     });
//   var N = function (n, r, t, e) {
//     if (n === r) return 0 !== n || 1 / n == 1 / r;
//     if (null == n || null == r) return n === r;
//     n instanceof m && (n = n._wrapped), r instanceof m && (r = r._wrapped);
//     var u = s.call(n);
//     if (u !== s.call(r)) return !1;
//     switch (u) {
//       case '[object RegExp]':
//       case '[object String]':
//         return '' + n == '' + r;
//       case '[object Number]':
//         return +n != +n ? +r != +r : 0 == +n ? 1 / +n == 1 / r : +n == +r;
//       case '[object Date]':
//       case '[object Boolean]':
//         return +n == +r;
//     }
//     var i = '[object Array]' === u;
//     if (!i) {
//       if ('object' != typeof n || 'object' != typeof r) return !1;
//       var o = n.constructor,
//         a = r.constructor;
//       if (
//         o !== a &&
//         !(
//           m.isFunction(o) &&
//           o instanceof o &&
//           m.isFunction(a) &&
//           a instanceof a
//         ) &&
//         'constructor' in n &&
//         'constructor' in r
//       )
//         return !1;
//     }
//     e = e || [];
//     for (var c = (t = t || []).length; c--; ) if (t[c] === n) return e[c] === r;
//     if ((t.push(n), e.push(r), i)) {
//       if ((c = n.length) !== r.length) return !1;
//       for (; c--; ) if (!N(n[c], r[c], t, e)) return !1;
//     } else {
//       var f,
//         l = m.keys(n);
//       if (((c = l.length), m.keys(r).length !== c)) return !1;
//       for (; c--; )
//         if (((f = l[c]), !m.has(r, f) || !N(n[f], r[f], t, e))) return !1;
//     }
//     return t.pop(), e.pop(), !0;
//   };
//   (m.isEqual = function (n, r) {
//     return N(n, r);
//   }),
//     (m.isEmpty = function (n) {
//       return (
//         null == n ||
//         (k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n))
//           ? 0 === n.length
//           : 0 === m.keys(n).length)
//       );
//     }),
//     (m.isElement = function (n) {
//       return !(!n || 1 !== n.nodeType);
//     }),
//     (m.isArray =
//       h ||
//       function (n) {
//         return '[object Array]' === s.call(n);
//       }),
//     (m.isObject = function (n) {
//       var r = typeof n;
//       return 'function' === r || ('object' === r && !!n);
//     }),
//     m.each(
//       ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'],
//       function (n) {
//         m['is' + n] = function (r) {
//           return s.call(r) === '[object ' + n + ']';
//         };
//       }
//     ),
//     m.isArguments(arguments) ||
//       (m.isArguments = function (n) {
//         return m.has(n, 'callee');
//       }),
//     'function' != typeof /./ &&
//       'object' != typeof Int8Array &&
//       (m.isFunction = function (n) {
//         return 'function' == typeof n || !1;
//       }),
//     (m.isFinite = function (n) {
//       return isFinite(n) && !isNaN(parseFloat(n));
//     }),
//     (m.isNaN = function (n) {
//       return m.isNumber(n) && n !== +n;
//     }),
//     (m.isBoolean = function (n) {
//       return !0 === n || !1 === n || '[object Boolean]' === s.call(n);
//     }),
//     (m.isNull = function (n) {
//       return null === n;
//     }),
//     (m.isUndefined = function (n) {
//       return void 0 === n;
//     }),
//     (m.has = function (n, r) {
//       return null != n && p.call(n, r);
//     }),
//     (m.noConflict = function () {
//       return (u._ = i), this;
//     }),
//     (m.identity = function (n) {
//       return n;
//     }),
//     (m.constant = function (n) {
//       return function () {
//         return n;
//       };
//     }),
//     (m.noop = function () {}),
//     (m.property = w),
//     (m.propertyOf = function (n) {
//       return null == n
//         ? function () {}
//         : function (r) {
//             return n[r];
//           };
//     }),
//     (m.matcher = m.matches =
//       function (n) {
//         return (
//           (n = m.extendOwn({}, n)),
//           function (r) {
//             return m.isMatch(r, n);
//           }
//         );
//       }),
//     (m.times = function (n, r, t) {
//       var e = Array(Math.max(0, n));
//       r = b(r, t, 1);
//       for (var u = 0; n > u; u++) e[u] = r(u);
//       return e;
//     }),
//     (m.random = function (n, r) {
//       return (
//         null == r && ((r = n), (n = 0)),
//         n + Math.floor(Math.random() * (r - n + 1))
//       );
//     }),
//     (m.now =
//       Date.now ||
//       function () {
//         return new Date().getTime();
//       });
//   var B = {
//       '&': '&amp;',
//       '<': '&lt;',
//       '>': '&gt;',
//       '"': '&quot;',
//       "'": '&#x27;',
//       '`': '&#x60;',
//     },
//     T = m.invert(B),
//     R = function (n) {
//       var r = function (r) {
//           return n[r];
//         },
//         t = '(?:' + m.keys(n).join('|') + ')',
//         e = RegExp(t),
//         u = RegExp(t, 'g');
//       return function (n) {
//         return (n = null == n ? '' : '' + n), e.test(n) ? n.replace(u, r) : n;
//       };
//     };
//   (m.escape = R(B)),
//     (m.unescape = R(T)),
//     (m.result = function (n, r, t) {
//       var e = null == n ? void 0 : n[r];
//       return void 0 === e && (e = t), m.isFunction(e) ? e.call(n) : e;
//     });
//   var q = 0;
//   (m.uniqueId = function (n) {
//     var r = ++q + '';
//     return n ? n + r : r;
//   }),
//     (m.templateSettings = {
//       evaluate: /<%([\s\S]+?)%>/g,
//       interpolate: /<%=([\s\S]+?)%>/g,
//       escape: /<%-([\s\S]+?)%>/g,
//     });
//   var K = /(.)^/,
//     z = {
//       "'": "'",
//       '\\': '\\',
//       '\r': 'r',
//       '\n': 'n',
//       '\u2028': 'u2028',
//       '\u2029': 'u2029',
//     },
//     D = /\\|'|\r|\n|\u2028|\u2029/g,
//     L = function (n) {
//       return '\\' + z[n];
//     };
//   (m.template = function (n, r, t) {
//     !r && t && (r = t), (r = m.defaults({}, r, m.templateSettings));
//     var e = RegExp(
//         [
//           (r.escape || K).source,
//           (r.interpolate || K).source,
//           (r.evaluate || K).source,
//         ].join('|') + '|$',
//         'g'
//       ),
//       u = 0,
//       i = "__p+='";
//     n.replace(e, function (r, t, e, o, a) {
//       return (
//         (i += n.slice(u, a).replace(D, L)),
//         (u = a + r.length),
//         t
//           ? (i += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'")
//           : e
//             ? (i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'")
//             : o && (i += "';\n" + o + "\n__p+='"),
//         r
//       );
//     }),
//       (i += "';\n"),
//       r.variable || (i = 'with(obj||{}){\n' + i + '}\n'),
//       (i =
//         "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
//         i +
//         'return __p;\n');
//     try {
//       var o = new Function(r.variable || 'obj', '_', i);
//     } catch (n) {
//       throw ((n.source = i), n);
//     }
//     var a = function (n) {
//         return o.call(this, n, m);
//       },
//       c = r.variable || 'obj';
//     return (a.source = 'function(' + c + '){\n' + i + '}'), a;
//   }),
//     (m.chain = function (n) {
//       var r = m(n);
//       return (r._chain = !0), r;
//     });
//   var P = function (n, r) {
//     return n._chain ? m(r).chain() : r;
//   };
//   (m.mixin = function (n) {
//     m.each(m.functions(n), function (r) {
//       var t = (m[r] = n[r]);
//       m.prototype[r] = function () {
//         var n = [this._wrapped];
//         return f.apply(n, arguments), P(this, t.apply(m, n));
//       };
//     });
//   }),
//     m.mixin(m),
//     m.each(
//       ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'],
//       function (n) {
//         var r = o[n];
//         m.prototype[n] = function () {
//           var t = this._wrapped;
//           return (
//             r.apply(t, arguments),
//             ('shift' !== n && 'splice' !== n) || 0 !== t.length || delete t[0],
//             P(this, t)
//           );
//         };
//       }
//     ),
//     m.each(['concat', 'join', 'slice'], function (n) {
//       var r = o[n];
//       m.prototype[n] = function () {
//         return P(this, r.apply(this._wrapped, arguments));
//       };
//     }),
//     (m.prototype.value = function () {
//       return this._wrapped;
//     }),
//     (m.prototype.valueOf = m.prototype.toJSON = m.prototype.value),
//     (m.prototype.toString = function () {
//       return '' + this._wrapped;
//     }),
//     'function' == typeof define &&
//       define.amd &&
//       define('underscore', [], function () {
//         return m;
//       });
// }).call(this);
// /**
//  * gridstack.js 0.3.0
//  * http://troolee.github.io/gridstack.js/
//  * (c) 2014-2016 Pavel Reznikov, Dylan Weiss
//  * gridstack.js may be freely distributed under the MIT license.
//  * @preserve
//  */
// !(function (t) {
//   if ('function' == typeof define && define.amd)
//     define(['jquery', 'lodash'], t);
//   else if ('undefined' != typeof exports) {
//     try {
//       jQuery = require('jquery');
//     } catch (t) {}
//     try {
//       _ = require('lodash');
//     } catch (t) {}
//     t(jQuery, _);
//   } else t(jQuery, _);
// })(function (t, e) {
//   function i(t) {
//     this.grid = t;
//   }
//   var o = window,
//     a = function (t, e, i) {
//       var o = function () {
//         return (
//           console.warn(
//             'gridstack.js: Function `' +
//               e +
//               '` is deprecated as of v0.2.5 and has been replaced with `' +
//               i +
//               '`. It will be **completely** removed in v1.0.'
//           ),
//           t.apply(this, arguments)
//         );
//       };
//       return (o.prototype = t.prototype), o;
//     },
//     s = function (t, e) {
//       console.warn(
//         'gridstack.js: Option `' +
//           t +
//           '` is deprecated as of v0.2.5 and has been replaced with `' +
//           e +
//           '`. It will be **completely** removed in v1.0.'
//       );
//     },
//     r = {
//       isIntercepted: function (t, e) {
//         return !(
//           t.x + t.width <= e.x ||
//           e.x + e.width <= t.x ||
//           t.y + t.height <= e.y ||
//           e.y + e.height <= t.y
//         );
//       },
//       sort: function (t, i, o) {
//         return (
//           (o =
//             o ||
//             e
//               .chain(t)
//               .map(function (t) {
//                 return t.x + t.width;
//               })
//               .max()
//               .value()),
//           (i = -1 != i ? 1 : -1),
//           e.sortBy(t, function (t) {
//             return i * (t.x + t.y * o);
//           })
//         );
//       },
//       createStylesheet: function (t) {
//         var e = document.createElement('style');
//         return (
//           e.setAttribute('type', 'text/css'),
//           e.setAttribute('data-gs-style-id', t),
//           e.styleSheet
//             ? (e.styleSheet.cssText = '')
//             : e.appendChild(document.createTextNode('')),
//           document.getElementsByTagName('head')[0].appendChild(e),
//           e.sheet
//         );
//       },
//       removeStylesheet: function (e) {
//         t('STYLE[data-gs-style-id=' + e + ']').remove();
//       },
//       insertCSSRule: function (t, e, i, o) {
//         'function' == typeof t.insertRule
//           ? t.insertRule(e + '{' + i + '}', o)
//           : 'function' == typeof t.addRule && t.addRule(e, i, o);
//       },
//       toBool: function (t) {
//         return 'boolean' == typeof t
//           ? t
//           : 'string' == typeof t
//             ? !(
//                 '' === (t = t.toLowerCase()) ||
//                 'no' == t ||
//                 'false' == t ||
//                 '0' == t
//               )
//             : Boolean(t);
//       },
//       _collisionNodeCheck: function (t) {
//         return t != this.node && r.isIntercepted(t, this.nn);
//       },
//       _didCollide: function (t) {
//         return r.isIntercepted(
//           {
//             x: this.n.x,
//             y: this.newY,
//             width: this.n.width,
//             height: this.n.height,
//           },
//           t
//         );
//       },
//       _isAddNodeIntercepted: function (t) {
//         return r.isIntercepted(
//           {
//             x: this.x,
//             y: this.y,
//             width: this.node.width,
//             height: this.node.height,
//           },
//           t
//         );
//       },
//       parseHeight: function (t) {
//         var i = t,
//           o = 'px';
//         if (i && e.isString(i)) {
//           var a = i.match(
//             /^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw)?$/
//           );
//           if (!a) throw new Error('Invalid height');
//           (o = a[2] || 'px'), (i = parseFloat(a[1]));
//         }
//         return {
//           height: i,
//           unit: o,
//         };
//       },
//     };
//   (r.is_intercepted = a(r.isIntercepted, 'is_intercepted', 'isIntercepted')),
//     (r.create_stylesheet = a(
//       r.createStylesheet,
//       'create_stylesheet',
//       'createStylesheet'
//     )),
//     (r.remove_stylesheet = a(
//       r.removeStylesheet,
//       'remove_stylesheet',
//       'removeStylesheet'
//     )),
//     (r.insert_css_rule = a(
//       r.insertCSSRule,
//       'insert_css_rule',
//       'insertCSSRule'
//     )),
//     (i.registeredPlugins = []),
//     (i.registerPlugin = function (t) {
//       i.registeredPlugins.push(t);
//     }),
//     (i.prototype.resizable = function (t, e) {
//       return this;
//     }),
//     (i.prototype.draggable = function (t, e) {
//       return this;
//     }),
//     (i.prototype.droppable = function (t, e) {
//       return this;
//     }),
//     (i.prototype.isDroppable = function (t) {
//       return !1;
//     }),
//     (i.prototype.on = function (t, e, i) {
//       return this;
//     });
//   var d = 0,
//     n = function (t, e, i, o, a) {
//       (this.width = t),
//         (this.float = i || !1),
//         (this.height = o || 0),
//         (this.nodes = a || []),
//         (this.onchange = e || function () {}),
//         (this._updateCounter = 0),
//         (this._float = this.float),
//         (this._addedNodes = []),
//         (this._removedNodes = []);
//     };
//   (n.prototype.batchUpdate = function () {
//     (this._updateCounter = 1), (this.float = !0);
//   }),
//     (n.prototype.commit = function () {
//       0 !== this._updateCounter &&
//         ((this._updateCounter = 0),
//         (this.float = this._float),
//         this._packNodes(),
//         this._notify());
//     }),
//     (n.prototype.getNodeDataByDOMEl = function (t) {
//       return e.find(this.nodes, function (e) {
//         return t.get(0) === e.el.get(0);
//       });
//     }),
//     (n.prototype._fixCollisions = function (t) {
//       this._sortNodes(-1);
//       var i = t,
//         o = Boolean(
//           e.find(this.nodes, function (t) {
//             return t.locked;
//           })
//         );
//       for (
//         this.float ||
//         o ||
//         (i = {
//           x: 0,
//           y: t.y,
//           width: this.width,
//           height: t.height,
//         });
//         ;

//       ) {
//         var a = e.find(
//           this.nodes,
//           e.bind(r._collisionNodeCheck, {
//             node: t,
//             nn: i,
//           })
//         );
//         if (void 0 === a) return;
//         this.moveNode(a, a.x, t.y + t.height, a.width, a.height, !0);
//       }
//     }),
//     (n.prototype.isAreaEmpty = function (t, i, o, a) {
//       var s = {
//           x: t || 0,
//           y: i || 0,
//           width: o || 1,
//           height: a || 1,
//         },
//         d = e.find(
//           this.nodes,
//           e.bind(function (t) {
//             return r.isIntercepted(t, s);
//           }, this)
//         );
//       return null == d;
//     }),
//     (n.prototype._sortNodes = function (t) {
//       this.nodes = r.sort(this.nodes, t, this.width);
//     }),
//     (n.prototype._packNodes = function () {
//       this._sortNodes(),
//         this.float
//           ? e.each(
//               this.nodes,
//               e.bind(function (t, i) {
//                 if (!t._updating && void 0 !== t._origY && t.y != t._origY)
//                   for (var o = t.y; o >= t._origY; ) {
//                     e
//                       .chain(this.nodes)
//                       .find(
//                         e.bind(r._didCollide, {
//                           n: t,
//                           newY: o,
//                         })
//                       )
//                       .value() || ((t._dirty = !0), (t.y = o)),
//                       --o;
//                   }
//               }, this)
//             )
//           : e.each(
//               this.nodes,
//               e.bind(function (t, i) {
//                 if (!t.locked)
//                   for (; t.y > 0; ) {
//                     var o = t.y - 1,
//                       a = 0 === i;
//                     if (i > 0)
//                       a =
//                         void 0 ===
//                         e
//                           .chain(this.nodes)
//                           .take(i)
//                           .find(
//                             e.bind(r._didCollide, {
//                               n: t,
//                               newY: o,
//                             })
//                           )
//                           .value();
//                     if (!a) break;
//                     (t._dirty = t.y != o), (t.y = o);
//                   }
//               }, this)
//             );
//     }),
//     (n.prototype._prepareNode = function (t, i) {
//       return (
//         ((t = e.defaults(t || {}, {
//           width: 1,
//           height: 1,
//           x: 0,
//           y: 0,
//         })).x = parseInt('' + t.x)),
//         (t.y = parseInt('' + t.y)),
//         (t.width = parseInt('' + t.width)),
//         (t.height = parseInt('' + t.height)),
//         (t.autoPosition = t.autoPosition || !1),
//         (t.noResize = t.noResize || !1),
//         (t.noMove = t.noMove || !1),
//         t.width > this.width
//           ? (t.width = this.width)
//           : t.width < 1 && (t.width = 1),
//         t.height < 1 && (t.height = 1),
//         t.x < 0 && (t.x = 0),
//         t.x + t.width > this.width &&
//           (i ? (t.width = this.width - t.x) : (t.x = this.width - t.width)),
//         t.y < 0 && (t.y = 0),
//         t
//       );
//     }),
//     (n.prototype._notify = function () {
//       var t = Array.prototype.slice.call(arguments, 0);
//       if (
//         ((t[0] = void 0 === t[0] ? [] : [t[0]]),
//         (t[1] = void 0 === t[1] || t[1]),
//         !this._updateCounter)
//       ) {
//         var e = t[0].concat(this.getDirtyNodes());
//         this.onchange(e, t[1]);
//       }
//     }),
//     (n.prototype.cleanNodes = function () {
//       this._updateCounter ||
//         e.each(this.nodes, function (t) {
//           t._dirty = !1;
//         });
//     }),
//     (n.prototype.getDirtyNodes = function () {
//       return e.filter(this.nodes, function (t) {
//         return t._dirty;
//       });
//     }),
//     (n.prototype.addNode = function (t, i) {
//       if (
//         (void 0 !== (t = this._prepareNode(t)).maxWidth &&
//           (t.width = Math.min(t.width, t.maxWidth)),
//         void 0 !== t.maxHeight && (t.height = Math.min(t.height, t.maxHeight)),
//         void 0 !== t.minWidth && (t.width = Math.max(t.width, t.minWidth)),
//         void 0 !== t.minHeight && (t.height = Math.max(t.height, t.minHeight)),
//         (t._id = ++d),
//         (t._dirty = !0),
//         t.autoPosition)
//       ) {
//         this._sortNodes();
//         for (var o = 0; ; ++o) {
//           var a = o % this.width,
//             s = Math.floor(o / this.width);
//           if (
//             !(
//               a + t.width > this.width ||
//               e.find(
//                 this.nodes,
//                 e.bind(r._isAddNodeIntercepted, {
//                   x: a,
//                   y: s,
//                   node: t,
//                 })
//               )
//             )
//           ) {
//             (t.x = a), (t.y = s);
//             break;
//           }
//         }
//       }
//       return (
//         this.nodes.push(t),
//         void 0 !== i && i && this._addedNodes.push(e.clone(t)),
//         this._fixCollisions(t),
//         this._packNodes(),
//         this._notify(),
//         t
//       );
//     }),
//     (n.prototype.removeNode = function (t, i) {
//       (i = void 0 === i || i),
//         this._removedNodes.push(e.clone(t)),
//         (t._id = null),
//         (this.nodes = e.without(this.nodes, t)),
//         this._packNodes(),
//         this._notify(t, i);
//     }),
//     (n.prototype.canMoveNode = function (i, o, a, s, r) {
//       if (!this.isNodeChangedPosition(i, o, a, s, r)) return !1;
//       var d = Boolean(
//         e.find(this.nodes, function (t) {
//           return t.locked;
//         })
//       );
//       if (!this.height && !d) return !0;
//       var h,
//         l = new n(
//           this.width,
//           null,
//           this.float,
//           0,
//           e.map(this.nodes, function (e) {
//             return e == i ? (h = t.extend({}, e)) : t.extend({}, e);
//           })
//         );
//       if (void 0 === h) return !0;
//       l.moveNode(h, o, a, s, r);
//       var p = !0;
//       return (
//         d &&
//           (p &= !Boolean(
//             e.find(l.nodes, function (t) {
//               return t != h && Boolean(t.locked) && Boolean(t._dirty);
//             })
//           )),
//         this.height && (p &= l.getGridHeight() <= this.height),
//         p
//       );
//     }),
//     (n.prototype.canBePlacedWithRespectToHeight = function (i) {
//       if (!this.height) return !0;
//       var o = new n(
//         this.width,
//         null,
//         this.float,
//         0,
//         e.map(this.nodes, function (e) {
//           return t.extend({}, e);
//         })
//       );
//       return o.addNode(i), o.getGridHeight() <= this.height;
//     }),
//     (n.prototype.isNodeChangedPosition = function (t, e, i, o, a) {
//       return (
//         'number' != typeof e && (e = t.x),
//         'number' != typeof i && (i = t.y),
//         'number' != typeof o && (o = t.width),
//         'number' != typeof a && (a = t.height),
//         void 0 !== t.maxWidth && (o = Math.min(o, t.maxWidth)),
//         void 0 !== t.maxHeight && (a = Math.min(a, t.maxHeight)),
//         void 0 !== t.minWidth && (o = Math.max(o, t.minWidth)),
//         void 0 !== t.minHeight && (a = Math.max(a, t.minHeight)),
//         t.x != e || t.y != i || t.width != o || t.height != a
//       );
//     }),
//     (n.prototype.moveNode = function (t, e, i, o, a, s) {
//       if (!this.isNodeChangedPosition(t, e, i, o, a)) return t;
//       if (
//         ('number' != typeof e && (e = t.x),
//         'number' != typeof i && (i = t.y),
//         'number' != typeof o && (o = t.width),
//         'number' != typeof a && (a = t.height),
//         void 0 !== t.maxWidth && (o = Math.min(o, t.maxWidth)),
//         void 0 !== t.maxHeight && (a = Math.min(a, t.maxHeight)),
//         void 0 !== t.minWidth && (o = Math.max(o, t.minWidth)),
//         void 0 !== t.minHeight && (a = Math.max(a, t.minHeight)),
//         t.x == e && t.y == i && t.width == o && t.height == a)
//       )
//         return t;
//       var r = t.width != o;
//       return (
//         (t._dirty = !0),
//         (t.x = e),
//         (t.y = i),
//         (t.width = o),
//         (t.height = a),
//         (t.lastTriedX = e),
//         (t.lastTriedY = i),
//         (t.lastTriedWidth = o),
//         (t.lastTriedHeight = a),
//         (t = this._prepareNode(t, r)),
//         this._fixCollisions(t),
//         s || (this._packNodes(), this._notify()),
//         t
//       );
//     }),
//     (n.prototype.getGridHeight = function () {
//       return e.reduce(
//         this.nodes,
//         function (t, e) {
//           return Math.max(t, e.y + e.height);
//         },
//         0
//       );
//     }),
//     (n.prototype.beginUpdate = function (t) {
//       e.each(this.nodes, function (t) {
//         t._origY = t.y;
//       }),
//         (t._updating = !0);
//     }),
//     (n.prototype.endUpdate = function () {
//       e.each(this.nodes, function (t) {
//         t._origY = t.y;
//       });
//       var t = e.find(this.nodes, function (t) {
//         return t._updating;
//       });
//       t && (t._updating = !1);
//     });
//   var h = function (o, a) {
//     var r,
//       d,
//       h = this;
//     (a = a || {}),
//       (this.container = t(o)),
//       void 0 !== a.handle_class &&
//         ((a.handleClass = a.handle_class), s('handle_class', 'handleClass')),
//       void 0 !== a.item_class &&
//         ((a.itemClass = a.item_class), s('item_class', 'itemClass')),
//       void 0 !== a.placeholder_class &&
//         ((a.placeholderClass = a.placeholder_class),
//         s('placeholder_class', 'placeholderClass')),
//       void 0 !== a.placeholder_text &&
//         ((a.placeholderText = a.placeholder_text),
//         s('placeholder_text', 'placeholderText')),
//       void 0 !== a.cell_height &&
//         ((a.cellHeight = a.cell_height), s('cell_height', 'cellHeight')),
//       void 0 !== a.vertical_margin &&
//         ((a.verticalMargin = a.vertical_margin),
//         s('vertical_margin', 'verticalMargin')),
//       void 0 !== a.min_width &&
//         ((a.minWidth = a.min_width), s('min_width', 'minWidth')),
//       void 0 !== a.static_grid &&
//         ((a.staticGrid = a.static_grid), s('static_grid', 'staticGrid')),
//       void 0 !== a.is_nested &&
//         ((a.isNested = a.is_nested), s('is_nested', 'isNested')),
//       void 0 !== a.always_show_resize_handle &&
//         ((a.alwaysShowResizeHandle = a.always_show_resize_handle),
//         s('always_show_resize_handle', 'alwaysShowResizeHandle')),
//       (a.itemClass = a.itemClass || 'grid-stack-item');
//     var l = this.container.closest('.' + a.itemClass).length > 0;
//     if (
//       ((this.opts = e.defaults(a || {}, {
//         width: parseInt(this.container.attr('data-gs-width')) || 12,
//         height: parseInt(this.container.attr('data-gs-height')) || 0,
//         itemClass: 'grid-stack-item',
//         placeholderClass: 'grid-stack-placeholder',
//         placeholderText: '',
//         handle: '.grid-stack-item-content',
//         handleClass: null,
//         cellHeight: 60,
//         verticalMargin: 20,
//         auto: !0,
//         minWidth: 768,
//         float: !1,
//         staticGrid: !1,
//         _class: 'grid-stack-instance-' + (1e4 * Math.random()).toFixed(0),
//         animate: Boolean(this.container.attr('data-gs-animate')) || !1,
//         alwaysShowResizeHandle: a.alwaysShowResizeHandle || !1,
//         resizable: e.defaults(a.resizable || {}, {
//           autoHide: !a.alwaysShowResizeHandle,
//           handles: 'se',
//         }),
//         draggable: e.defaults(a.draggable || {}, {
//           handle:
//             (a.handleClass ? '.' + a.handleClass : a.handle ? a.handle : '') ||
//             '.grid-stack-item-content',
//           scroll: !1,
//           appendTo: 'body',
//         }),
//         disableDrag: a.disableDrag || !1,
//         disableResize: a.disableResize || !1,
//         rtl: 'auto',
//         removable: !1,
//         removeTimeout: 2e3,
//         verticalMarginUnit: 'px',
//         cellHeightUnit: 'px',
//         disableOneColumnMode: a.disableOneColumnMode || !1,
//         oneColumnModeClass:
//           a.oneColumnModeClass || 'grid-stack-one-column-mode',
//         ddPlugin: null,
//       })),
//       !1 === this.opts.ddPlugin
//         ? (this.opts.ddPlugin = i)
//         : null === this.opts.ddPlugin &&
//           (this.opts.ddPlugin = e.first(i.registeredPlugins) || i),
//       (this.dd = new this.opts.ddPlugin(this)),
//       'auto' === this.opts.rtl &&
//         (this.opts.rtl = 'rtl' === this.container.css('direction')),
//       this.opts.rtl && this.container.addClass('grid-stack-rtl'),
//       (this.opts.isNested = l),
//       (d = 'auto' === this.opts.cellHeight)
//         ? h.cellHeight(h.cellWidth(), !0)
//         : this.cellHeight(this.opts.cellHeight, !0),
//       this.verticalMargin(this.opts.verticalMargin, !0),
//       this.container.addClass(this.opts._class),
//       this._setStaticClass(),
//       l && this.container.addClass('grid-stack-nested'),
//       this._initStyles(),
//       (this.grid = new n(
//         this.opts.width,
//         function (t, i) {
//           i = void 0 === i || i;
//           var o = 0;
//           e.each(t, function (t) {
//             i && null === t._id
//               ? t.el && t.el.remove()
//               : (t.el
//                   .attr('data-gs-x', t.x)
//                   .attr('data-gs-y', t.y)
//                   .attr('data-gs-width', t.width)
//                   .attr('data-gs-height', t.height),
//                 (o = Math.max(o, t.y + t.height)));
//           }),
//             h._updateStyles(o + 10);
//         },
//         this.opts.float,
//         this.opts.height
//       )),
//       this.opts.auto)
//     ) {
//       var p = [],
//         g = this;
//       this.container
//         .children(
//           '.' +
//             this.opts.itemClass +
//             ':not(.' +
//             this.opts.placeholderClass +
//             ')'
//         )
//         .each(function (e, i) {
//           (i = t(i)),
//             p.push({
//               el: i,
//               i:
//                 parseInt(i.attr('data-gs-x')) +
//                 parseInt(i.attr('data-gs-y')) * g.opts.width,
//             });
//         }),
//         e
//           .chain(p)
//           .sortBy(function (t) {
//             return t.i;
//           })
//           .each(function (t) {
//             h._prepareElement(t.el);
//           })
//           .value();
//     }
//     if (
//       (this.setAnimation(this.opts.animate),
//       (this.placeholder = t(
//         '<div className="' +
//           this.opts.placeholderClass +
//           ' ' +
//           this.opts.itemClass +
//           '"><div className="placeholder-content">' +
//           this.opts.placeholderText +
//           '</div></div>'
//       ).hide()),
//       this._updateContainerHeight(),
//       (this._updateHeightsOnResize = e.throttle(function () {
//         h.cellHeight(h.cellWidth(), !1);
//       }, 100)),
//       (this.onResizeHandler = function () {
//         if (
//           (d && h._updateHeightsOnResize(),
//           h._isOneColumnMode() && !h.opts.disableOneColumnMode)
//         ) {
//           if (r) return;
//           h.container.addClass(h.opts.oneColumnModeClass),
//             (r = !0),
//             h.grid._sortNodes(),
//             e.each(h.grid.nodes, function (t) {
//               h.container.append(t.el),
//                 h.opts.staticGrid ||
//                   (h.dd.draggable(t.el, 'disable'),
//                   h.dd.resizable(t.el, 'disable'),
//                   t.el.trigger('resize'));
//             });
//         } else {
//           if (!r) return;
//           if (
//             (h.container.removeClass(h.opts.oneColumnModeClass),
//             (r = !1),
//             h.opts.staticGrid)
//           )
//             return;
//           e.each(h.grid.nodes, function (t) {
//             t.noMove || h.opts.disableDrag || h.dd.draggable(t.el, 'enable'),
//               t.noResize ||
//                 h.opts.disableResize ||
//                 h.dd.resizable(t.el, 'enable'),
//               t.el.trigger('resize');
//           });
//         }
//       }),
//       t(window).resize(this.onResizeHandler),
//       this.onResizeHandler(),
//       !h.opts.staticGrid && 'string' == typeof h.opts.removable)
//     ) {
//       var c = t(h.opts.removable);
//       this.dd.isDroppable(c) ||
//         this.dd.droppable(c, {
//           accept: '.' + h.opts.itemClass,
//         }),
//         this.dd
//           .on(c, 'dropover', function (e, i) {
//             var o = t(i.draggable);
//             o.data('_gridstack_node')._grid === h && h._setupRemovingTimeout(o);
//           })
//           .on(c, 'dropout', function (e, i) {
//             var o = t(i.draggable);
//             o.data('_gridstack_node')._grid === h && h._clearRemovingTimeout(o);
//           });
//     }
//     if (!h.opts.staticGrid && h.opts.acceptWidgets) {
//       var _ = null,
//         u = function (t, e) {
//           var i = _,
//             o = i.data('_gridstack_node'),
//             a = h.getCellFromPixel(e.offset, !0),
//             s = Math.max(0, a.x),
//             r = Math.max(0, a.y);
//           if (o._added) {
//             if (!h.grid.canMoveNode(o, s, r)) return;
//             h.grid.moveNode(o, s, r), h._updateContainerHeight();
//           } else
//             (o._added = !0),
//               (o.el = i),
//               (o.x = s),
//               (o.y = r),
//               h.grid.cleanNodes(),
//               h.grid.beginUpdate(o),
//               h.grid.addNode(o),
//               h.container.append(h.placeholder),
//               h.placeholder
//                 .attr('data-gs-x', o.x)
//                 .attr('data-gs-y', o.y)
//                 .attr('data-gs-width', o.width)
//                 .attr('data-gs-height', o.height)
//                 .show(),
//               (o.el = h.placeholder),
//               (o._beforeDragX = o.x),
//               (o._beforeDragY = o.y),
//               h._updateContainerHeight();
//         };
//       this.dd
//         .droppable(h.container, {
//           accept: function (e) {
//             var i = (e = t(e)).data('_gridstack_node');
//             return (
//               (!i || i._grid !== h) &&
//               e.is(
//                 !0 === h.opts.acceptWidgets
//                   ? '.grid-stack-item'
//                   : h.opts.acceptWidgets
//               )
//             );
//           },
//         })
//         .on(h.container, 'dropover', function (e, i) {
//           var o = (h.container.offset(), t(i.draggable)),
//             a = h.cellWidth(),
//             s = h.cellHeight(),
//             r = o.data('_gridstack_node'),
//             d = r ? r.width : Math.ceil(o.outerWidth() / a),
//             n = r ? r.height : Math.ceil(o.outerHeight() / s);
//           _ = o;
//           var l = h.grid._prepareNode({
//             width: d,
//             height: n,
//             _added: !1,
//             _temporary: !0,
//           });
//           o.data('_gridstack_node', l),
//             o.data('_gridstack_node_orig', r),
//             o.on('drag', u);
//         })
//         .on(h.container, 'dropout', function (e, i) {
//           var o = t(i.draggable);
//           o.unbind('drag', u);
//           var a = o.data('_gridstack_node');
//           (a.el = null),
//             h.grid.removeNode(a),
//             h.placeholder.detach(),
//             h._updateContainerHeight(),
//             o.data('_gridstack_node', o.data('_gridstack_node_orig'));
//         })
//         .on(h.container, 'drop', function (e, i) {
//           h.placeholder.detach();
//           var o = t(i.draggable).data('_gridstack_node');
//           o._grid = h;
//           var a = t(i.draggable).clone(!1);
//           a.data('_gridstack_node', o);
//           var s = t(i.draggable).data('_gridstack_node_orig');
//           void 0 !== s && s._grid._triggerRemoveEvent(),
//             t(i.draggable).remove(),
//             (o.el = a),
//             h.placeholder.hide(),
//             a
//               .attr('data-gs-x', o.x)
//               .attr('data-gs-y', o.y)
//               .attr('data-gs-width', o.width)
//               .attr('data-gs-height', o.height)
//               .addClass(h.opts.itemClass)
//               .removeAttr('style')
//               .enableSelection()
//               .removeData('draggable')
//               .removeClass(
//                 'ui-draggable ui-draggable-dragging ui-draggable-disabled'
//               )
//               .unbind('drag', u),
//             h.container.append(a),
//             h._prepareElementsByNode(a, o),
//             h._updateContainerHeight(),
//             h.grid._addedNodes.push(o),
//             h._triggerAddEvent(),
//             h._triggerChangeEvent(),
//             h.grid.endUpdate();
//         });
//     }
//   };
//   return (
//     (h.prototype._triggerChangeEvent = function (t) {
//       var e = this.grid.getDirtyNodes(),
//         i = !1,
//         o = [];
//       e && e.length && (o.push(e), (i = !0)),
//         (i || !0 === t) && this.container.trigger('change', o);
//     }),
//     (h.prototype._triggerAddEvent = function () {
//       this.grid._addedNodes &&
//         this.grid._addedNodes.length > 0 &&
//         (this.container.trigger('added', [
//           e.map(this.grid._addedNodes, e.clone),
//         ]),
//         (this.grid._addedNodes = []));
//     }),
//     (h.prototype._triggerRemoveEvent = function () {
//       this.grid._removedNodes &&
//         this.grid._removedNodes.length > 0 &&
//         (this.container.trigger('removed', [
//           e.map(this.grid._removedNodes, e.clone),
//         ]),
//         (this.grid._removedNodes = []));
//     }),
//     (h.prototype._initStyles = function () {
//       this._stylesId && r.removeStylesheet(this._stylesId),
//         (this._stylesId = 'gridstack-style-' + (1e5 * Math.random()).toFixed()),
//         (this._styles = r.createStylesheet(this._stylesId)),
//         null !== this._styles && (this._styles._max = 0);
//     }),
//     (h.prototype._updateStyles = function (t) {
//       if (null !== this._styles && void 0 !== this._styles) {
//         var e,
//           i = '.' + this.opts._class + ' .' + this.opts.itemClass,
//           o = this;
//         if (
//           (void 0 === t && (t = this._styles._max),
//           this._initStyles(),
//           this._updateContainerHeight(),
//           this.opts.cellHeight &&
//             !(0 !== this._styles._max && t <= this._styles._max) &&
//             ((e =
//               this.opts.verticalMargin &&
//               this.opts.cellHeightUnit !== this.opts.verticalMarginUnit
//                 ? function (t, e) {
//                     return t && e
//                       ? 'calc(' +
//                           (o.opts.cellHeight * t + o.opts.cellHeightUnit) +
//                           ' + ' +
//                           (o.opts.verticalMargin * e +
//                             o.opts.verticalMarginUnit) +
//                           ')'
//                       : o.opts.cellHeight * t +
//                           o.opts.verticalMargin * e +
//                           o.opts.cellHeightUnit;
//                   }
//                 : function (t, e) {
//                     return (
//                       o.opts.cellHeight * t +
//                       o.opts.verticalMargin * e +
//                       o.opts.cellHeightUnit
//                     );
//                   }),
//             0 === this._styles._max &&
//               r.insertCSSRule(
//                 this._styles,
//                 i,
//                 'min-height: ' + e(1, 0) + ';',
//                 0
//               ),
//             t > this._styles._max))
//         ) {
//           for (var a = this._styles._max; a < t; ++a)
//             r.insertCSSRule(
//               this._styles,
//               i + '[data-gs-height="' + (a + 1) + '"]',
//               'height: ' + e(a + 1, a) + ';',
//               a
//             ),
//               r.insertCSSRule(
//                 this._styles,
//                 i + '[data-gs-min-height="' + (a + 1) + '"]',
//                 'min-height: ' + e(a + 1, a) + ';',
//                 a
//               ),
//               r.insertCSSRule(
//                 this._styles,
//                 i + '[data-gs-max-height="' + (a + 1) + '"]',
//                 'max-height: ' + e(a + 1, a) + ';',
//                 a
//               ),
//               r.insertCSSRule(
//                 this._styles,
//                 i + '[data-gs-y="' + a + '"]',
//                 'top: ' + e(a, a) + ';',
//                 a
//               );
//           this._styles._max = t;
//         }
//       }
//     }),
//     (h.prototype._updateContainerHeight = function () {
//       if (!this.grid._updateCounter) {
//         var t = this.grid.getGridHeight();
//         this.container.attr('data-gs-current-height', t),
//           this.opts.cellHeight &&
//             (this.opts.verticalMargin
//               ? this.opts.cellHeightUnit === this.opts.verticalMarginUnit
//                 ? this.container.css(
//                     'height',
//                     t * (this.opts.cellHeight + this.opts.verticalMargin) -
//                       this.opts.verticalMargin +
//                       this.opts.cellHeightUnit
//                   )
//                 : this.container.css(
//                     'height',
//                     'calc(' +
//                       (t * this.opts.cellHeight + this.opts.cellHeightUnit) +
//                       ' + ' +
//                       (t * (this.opts.verticalMargin - 1) +
//                         this.opts.verticalMarginUnit) +
//                       ')'
//                   )
//               : this.container.css(
//                   'height',
//                   t * this.opts.cellHeight + this.opts.cellHeightUnit
//                 ));
//       }
//     }),
//     (h.prototype._isOneColumnMode = function () {
//       return (
//         (window.innerWidth ||
//           document.documentElement.clientWidth ||
//           document.body.clientWidth) <= this.opts.minWidth
//       );
//     }),
//     (h.prototype._setupRemovingTimeout = function (e) {
//       var i = t(e).data('_gridstack_node');
//       !i._removeTimeout &&
//         this.opts.removable &&
//         (i._removeTimeout = setTimeout(function () {
//           e.addClass('grid-stack-item-removing'), (i._isAboutToRemove = !0);
//         }, this.opts.removeTimeout));
//     }),
//     (h.prototype._clearRemovingTimeout = function (e) {
//       var i = t(e).data('_gridstack_node');
//       i._removeTimeout &&
//         (clearTimeout(i._removeTimeout),
//         (i._removeTimeout = null),
//         e.removeClass('grid-stack-item-removing'),
//         (i._isAboutToRemove = !1));
//     }),
//     (h.prototype._prepareElementsByNode = function (e, i) {
//       var o,
//         a,
//         s = this,
//         r = function (t, r) {
//           var d,
//             n,
//             h = Math.round(r.position.left / o),
//             l = Math.floor((r.position.top + a / 2) / a);
//           if (
//             ('drag' != t.type &&
//               ((d = Math.round(r.size.width / o)),
//               (n = Math.round(r.size.height / a))),
//             'drag' == t.type)
//           )
//             h < 0 ||
//             h >= s.grid.width ||
//             l < 0 ||
//             (!s.grid.float && l > s.grid.getGridHeight())
//               ? i._temporaryRemoved ||
//                 (!0 === s.opts.removable && s._setupRemovingTimeout(e),
//                 (h = i._beforeDragX),
//                 (l = i._beforeDragY),
//                 s.placeholder.detach(),
//                 s.placeholder.hide(),
//                 s.grid.removeNode(i),
//                 s._updateContainerHeight(),
//                 (i._temporaryRemoved = !0))
//               : (s._clearRemovingTimeout(e),
//                 i._temporaryRemoved &&
//                   (s.grid.addNode(i),
//                   s.placeholder
//                     .attr('data-gs-x', h)
//                     .attr('data-gs-y', l)
//                     .attr('data-gs-width', d)
//                     .attr('data-gs-height', n)
//                     .show(),
//                   s.container.append(s.placeholder),
//                   (i.el = s.placeholder),
//                   (i._temporaryRemoved = !1)));
//           else if ('resize' == t.type && h < 0) return;
//           var p = void 0 !== d ? d : i.lastTriedWidth,
//             g = void 0 !== n ? n : i.lastTriedHeight;
//           !s.grid.canMoveNode(i, h, l, d, n) ||
//             (i.lastTriedX === h &&
//               i.lastTriedY === l &&
//               i.lastTriedWidth === p &&
//               i.lastTriedHeight === g) ||
//             ((i.lastTriedX = h),
//             (i.lastTriedY = l),
//             (i.lastTriedWidth = d),
//             (i.lastTriedHeight = n),
//             s.grid.moveNode(i, h, l, d, n),
//             s._updateContainerHeight());
//         },
//         d = function (r, d) {
//           s.container.append(s.placeholder);
//           var n = t(this);
//           s.grid.cleanNodes(), s.grid.beginUpdate(i), (o = s.cellWidth());
//           var h = Math.ceil(n.outerHeight() / n.attr('data-gs-height'));
//           (a =
//             s.container.height() /
//             parseInt(s.container.attr('data-gs-current-height'))),
//             s.placeholder
//               .attr('data-gs-x', n.attr('data-gs-x'))
//               .attr('data-gs-y', n.attr('data-gs-y'))
//               .attr('data-gs-width', n.attr('data-gs-width'))
//               .attr('data-gs-height', n.attr('data-gs-height'))
//               .show(),
//             (i.el = s.placeholder),
//             (i._beforeDragX = i.x),
//             (i._beforeDragY = i.y),
//             s.dd.resizable(e, 'option', 'minWidth', o * (i.minWidth || 1)),
//             s.dd.resizable(e, 'option', 'minHeight', h * (i.minHeight || 1)),
//             'resizestart' == r.type &&
//               n.find('.grid-stack-item').trigger('resizestart');
//         },
//         n = function (o, a) {
//           var r = t(this);
//           if (r.data('_gridstack_node')) {
//             var d = !1;
//             s.placeholder.detach(),
//               (i.el = r),
//               s.placeholder.hide(),
//               i._isAboutToRemove
//                 ? ((d = !0),
//                   e.data('_gridstack_node')._grid._triggerRemoveEvent(),
//                   e.removeData('_gridstack_node'),
//                   e.remove())
//                 : (s._clearRemovingTimeout(e),
//                   i._temporaryRemoved
//                     ? (r
//                         .attr('data-gs-x', i._beforeDragX)
//                         .attr('data-gs-y', i._beforeDragY)
//                         .attr('data-gs-width', i.width)
//                         .attr('data-gs-height', i.height)
//                         .removeAttr('style'),
//                       (i.x = i._beforeDragX),
//                       (i.y = i._beforeDragY),
//                       s.grid.addNode(i))
//                     : r
//                         .attr('data-gs-x', i.x)
//                         .attr('data-gs-y', i.y)
//                         .attr('data-gs-width', i.width)
//                         .attr('data-gs-height', i.height)
//                         .removeAttr('style')),
//               s._updateContainerHeight(),
//               s._triggerChangeEvent(d),
//               s.grid.endUpdate();
//             var n = r.find('.grid-stack');
//             n.length &&
//               'resizestop' == o.type &&
//               (n.each(function (e, i) {
//                 t(i).data('gridstack').onResizeHandler();
//               }),
//               r.find('.grid-stack-item').trigger('resizestop'),
//               r.find('.grid-stack-item').trigger('gsresizestop')),
//               'resizestop' == o.type && s.container.trigger('gsresizestop', r);
//           }
//         };
//       this.dd
//         .draggable(e, {
//           start: d,
//           stop: n,
//           drag: r,
//         })
//         .resizable(e, {
//           start: d,
//           stop: n,
//           resize: r,
//         }),
//         (i.noMove ||
//           (this._isOneColumnMode() && !s.opts.disableOneColumnMode) ||
//           this.opts.disableDrag) &&
//           this.dd.draggable(e, 'disable'),
//         (i.noResize ||
//           (this._isOneColumnMode() && !s.opts.disableOneColumnMode) ||
//           this.opts.disableResize) &&
//           this.dd.resizable(e, 'disable'),
//         e.attr('data-gs-locked', i.locked ? 'yes' : null);
//     }),
//     (h.prototype._prepareElement = function (e, i) {
//       i = void 0 !== i && i;
//       (e = t(e)).addClass(this.opts.itemClass);
//       var o = this.grid.addNode(
//         {
//           x: e.attr('data-gs-x'),
//           y: e.attr('data-gs-y'),
//           width: e.attr('data-gs-width'),
//           height: e.attr('data-gs-height'),
//           maxWidth: e.attr('data-gs-max-width'),
//           minWidth: e.attr('data-gs-min-width'),
//           maxHeight: e.attr('data-gs-max-height'),
//           minHeight: e.attr('data-gs-min-height'),
//           autoPosition: r.toBool(e.attr('data-gs-auto-position')),
//           noResize: r.toBool(e.attr('data-gs-no-resize')),
//           noMove: r.toBool(e.attr('data-gs-no-move')),
//           locked: r.toBool(e.attr('data-gs-locked')),
//           el: e,
//           id: e.attr('data-gs-id'),
//           _grid: this,
//         },
//         i
//       );
//       e.data('_gridstack_node', o), this._prepareElementsByNode(e, o);
//     }),
//     (h.prototype.setAnimation = function (t) {
//       t
//         ? this.container.addClass('grid-stack-animate')
//         : this.container.removeClass('grid-stack-animate');
//     }),
//     (h.prototype.addWidget = function (e, i, o, a, s, r, d, n, h, l, p) {
//       return (
//         (e = t(e)),
//         void 0 !== i && e.attr('data-gs-x', i),
//         void 0 !== o && e.attr('data-gs-y', o),
//         void 0 !== a && e.attr('data-gs-width', a),
//         void 0 !== s && e.attr('data-gs-height', s),
//         void 0 !== r && e.attr('data-gs-auto-position', r ? 'yes' : null),
//         void 0 !== d && e.attr('data-gs-min-width', d),
//         void 0 !== n && e.attr('data-gs-max-width', n),
//         void 0 !== h && e.attr('data-gs-min-height', h),
//         void 0 !== l && e.attr('data-gs-max-height', l),
//         void 0 !== p && e.attr('data-gs-id', p),
//         this.container.append(e),
//         this._prepareElement(e, !0),
//         this._triggerAddEvent(),
//         this._updateContainerHeight(),
//         this._triggerChangeEvent(!0),
//         e
//       );
//     }),
//     (h.prototype.makeWidget = function (e) {
//       return (
//         (e = t(e)),
//         this._prepareElement(e, !0),
//         this._triggerAddEvent(),
//         this._updateContainerHeight(),
//         this._triggerChangeEvent(!0),
//         e
//       );
//     }),
//     (h.prototype.willItFit = function (t, e, i, o, a) {
//       var s = {
//         x: t,
//         y: e,
//         width: i,
//         height: o,
//         autoPosition: a,
//       };
//       return this.grid.canBePlacedWithRespectToHeight(s);
//     }),
//     (h.prototype.removeWidget = function (e, i) {
//       i = void 0 === i || i;
//       var o = (e = t(e)).data('_gridstack_node');
//       o || (o = this.grid.getNodeDataByDOMEl(e)),
//         this.grid.removeNode(o, i),
//         e.removeData('_gridstack_node'),
//         this._updateContainerHeight(),
//         i && e.remove(),
//         this._triggerChangeEvent(!0),
//         this._triggerRemoveEvent();
//     }),
//     (h.prototype.removeAll = function (t) {
//       e.each(
//         this.grid.nodes,
//         e.bind(function (e) {
//           this.removeWidget(e.el, t);
//         }, this)
//       ),
//         (this.grid.nodes = []),
//         this._updateContainerHeight();
//     }),
//     (h.prototype.destroy = function (e) {
//       t(window).off('resize', this.onResizeHandler),
//         this.disable(),
//         void 0 === e || e
//           ? this.container.remove()
//           : (this.removeAll(!1), this.container.removeData('gridstack')),
//         r.removeStylesheet(this._stylesId),
//         this.grid && (this.grid = null);
//     }),
//     (h.prototype.resizable = function (e, i) {
//       var o = this;
//       return (
//         (e = t(e)).each(function (e, a) {
//           var s = (a = t(a)).data('_gridstack_node');
//           null != s &&
//             ((s.noResize = !i),
//             s.noResize || (o._isOneColumnMode() && !o.opts.disableOneColumnMode)
//               ? o.dd.resizable(a, 'disable')
//               : o.dd.resizable(a, 'enable'));
//         }),
//         this
//       );
//     }),
//     (h.prototype.movable = function (e, i) {
//       var o = this;
//       return (
//         (e = t(e)).each(function (e, a) {
//           var s = (a = t(a)).data('_gridstack_node');
//           null != s &&
//             ((s.noMove = !i),
//             s.noMove || (o._isOneColumnMode() && !o.opts.disableOneColumnMode)
//               ? (o.dd.draggable(a, 'disable'),
//                 a.removeClass('ui-draggable-handle'))
//               : (o.dd.draggable(a, 'enable'),
//                 a.addClass('ui-draggable-handle')));
//         }),
//         this
//       );
//     }),
//     (h.prototype.enableMove = function (t, e) {
//       this.movable(this.container.children('.' + this.opts.itemClass), t),
//         e && (this.opts.disableDrag = !t);
//     }),
//     (h.prototype.enableResize = function (t, e) {
//       this.resizable(this.container.children('.' + this.opts.itemClass), t),
//         e && (this.opts.disableResize = !t);
//     }),
//     (h.prototype.disable = function () {
//       this.movable(this.container.children('.' + this.opts.itemClass), !1),
//         this.resizable(this.container.children('.' + this.opts.itemClass), !1),
//         this.container.trigger('disable');
//     }),
//     (h.prototype.enable = function () {
//       this.movable(this.container.children('.' + this.opts.itemClass), !0),
//         this.resizable(this.container.children('.' + this.opts.itemClass), !0),
//         this.container.trigger('enable');
//     }),
//     (h.prototype.locked = function (e, i) {
//       return (
//         (e = t(e)).each(function (e, o) {
//           var a = (o = t(o)).data('_gridstack_node');
//           null != a &&
//             ((a.locked = i || !1),
//             o.attr('data-gs-locked', a.locked ? 'yes' : null));
//         }),
//         this
//       );
//     }),
//     (h.prototype.maxHeight = function (e, i) {
//       return (
//         (e = t(e)).each(function (e, o) {
//           var a = (o = t(o)).data('_gridstack_node');
//           null != a &&
//             (isNaN(i) ||
//               ((a.maxHeight = i || !1), o.attr('data-gs-max-height', i)));
//         }),
//         this
//       );
//     }),
//     (h.prototype.minHeight = function (e, i) {
//       return (
//         (e = t(e)).each(function (e, o) {
//           var a = (o = t(o)).data('_gridstack_node');
//           null != a &&
//             (isNaN(i) ||
//               ((a.minHeight = i || !1), o.attr('data-gs-min-height', i)));
//         }),
//         this
//       );
//     }),
//     (h.prototype.maxWidth = function (e, i) {
//       return (
//         (e = t(e)).each(function (e, o) {
//           var a = (o = t(o)).data('_gridstack_node');
//           null != a &&
//             (isNaN(i) ||
//               ((a.maxWidth = i || !1), o.attr('data-gs-max-width', i)));
//         }),
//         this
//       );
//     }),
//     (h.prototype.minWidth = function (e, i) {
//       return (
//         (e = t(e)).each(function (e, o) {
//           var a = (o = t(o)).data('_gridstack_node');
//           null != a &&
//             (isNaN(i) ||
//               ((a.minWidth = i || !1), o.attr('data-gs-min-width', i)));
//         }),
//         this
//       );
//     }),
//     (h.prototype._updateElement = function (e, i) {
//       var o = (e = t(e).first()).data('_gridstack_node');
//       if (null != o) {
//         var a = this;
//         a.grid.cleanNodes(),
//           a.grid.beginUpdate(o),
//           i.call(this, e, o),
//           a._updateContainerHeight(),
//           a._triggerChangeEvent(),
//           a.grid.endUpdate();
//       }
//     }),
//     (h.prototype.resize = function (t, e, i) {
//       this._updateElement(t, function (t, o) {
//         (e = null != e ? e : o.width),
//           (i = null != i ? i : o.height),
//           this.grid.moveNode(o, o.x, o.y, e, i);
//       });
//     }),
//     (h.prototype.move = function (t, e, i) {
//       this._updateElement(t, function (t, o) {
//         (e = null != e ? e : o.x),
//           (i = null != i ? i : o.y),
//           this.grid.moveNode(o, e, i, o.width, o.height);
//       });
//     }),
//     (h.prototype.update = function (t, e, i, o, a) {
//       this._updateElement(t, function (t, s) {
//         (e = null != e ? e : s.x),
//           (i = null != i ? i : s.y),
//           (o = null != o ? o : s.width),
//           (a = null != a ? a : s.height),
//           this.grid.moveNode(s, e, i, o, a);
//       });
//     }),
//     (h.prototype.verticalMargin = function (t, e) {
//       if (void 0 === t) return this.opts.verticalMargin;
//       var i = r.parseHeight(t);
//       (this.opts.verticalMarginUnit === i.unit &&
//         this.opts.height === i.height) ||
//         ((this.opts.verticalMarginUnit = i.unit),
//         (this.opts.verticalMargin = i.height),
//         e || this._updateStyles());
//     }),
//     (h.prototype.cellHeight = function (t, e) {
//       if (void 0 === t) {
//         if (this.opts.cellHeight) return this.opts.cellHeight;
//         var i = this.container.children('.' + this.opts.itemClass).first();
//         return Math.ceil(i.outerHeight() / i.attr('data-gs-height'));
//       }
//       var o = r.parseHeight(t);
//       (this.opts.cellHeightUnit === o.heightUnit &&
//         this.opts.height === o.height) ||
//         ((this.opts.cellHeightUnit = o.unit),
//         (this.opts.cellHeight = o.height),
//         e || this._updateStyles());
//     }),
//     (h.prototype.cellWidth = function () {
//       return Math.round(this.container.outerWidth() / this.opts.width);
//     }),
//     (h.prototype.getCellFromPixel = function (t, e) {
//       var i =
//           void 0 !== e && e
//             ? this.container.offset()
//             : this.container.position(),
//         o = t.left - i.left,
//         a = t.top - i.top,
//         s = Math.floor(this.container.width() / this.opts.width),
//         r = Math.floor(
//           this.container.height() /
//             parseInt(this.container.attr('data-gs-current-height'))
//         );
//       return {
//         x: Math.floor(o / s),
//         y: Math.floor(a / r),
//       };
//     }),
//     (h.prototype.batchUpdate = function () {
//       this.grid.batchUpdate();
//     }),
//     (h.prototype.commit = function () {
//       this.grid.commit(), this._updateContainerHeight();
//     }),
//     (h.prototype.isAreaEmpty = function (t, e, i, o) {
//       return this.grid.isAreaEmpty(t, e, i, o);
//     }),
//     (h.prototype.setStatic = function (t) {
//       (this.opts.staticGrid = !0 === t),
//         this.enableMove(!t),
//         this.enableResize(!t),
//         this._setStaticClass();
//     }),
//     (h.prototype._setStaticClass = function () {
//       !0 === this.opts.staticGrid
//         ? this.container.addClass('grid-stack-static')
//         : this.container.removeClass('grid-stack-static');
//     }),
//     (h.prototype._updateNodeWidths = function (t, e) {
//       this.grid._sortNodes(), this.grid.batchUpdate();
//       for (var i = {}, o = 0; o < this.grid.nodes.length; o++)
//         (i = this.grid.nodes[o]),
//           this.update(
//             i.el,
//             Math.round((i.x * e) / t),
//             void 0,
//             Math.round((i.width * e) / t),
//             void 0
//           );
//       this.grid.commit();
//     }),
//     (h.prototype.setGridWidth = function (t, e) {
//       this.container.removeClass('grid-stack-' + this.opts.width),
//         !0 !== e && this._updateNodeWidths(this.opts.width, t),
//         (this.opts.width = t),
//         (this.grid.width = t),
//         this.container.addClass('grid-stack-' + t);
//     }),
//     (n.prototype.batch_update = a(n.prototype.batchUpdate)),
//     (n.prototype._fix_collisions = a(
//       n.prototype._fixCollisions,
//       '_fix_collisions',
//       '_fixCollisions'
//     )),
//     (n.prototype.is_area_empty = a(
//       n.prototype.isAreaEmpty,
//       'is_area_empty',
//       'isAreaEmpty'
//     )),
//     (n.prototype._sort_nodes = a(
//       n.prototype._sortNodes,
//       '_sort_nodes',
//       '_sortNodes'
//     )),
//     (n.prototype._pack_nodes = a(
//       n.prototype._packNodes,
//       '_pack_nodes',
//       '_packNodes'
//     )),
//     (n.prototype._prepare_node = a(
//       n.prototype._prepareNode,
//       '_prepare_node',
//       '_prepareNode'
//     )),
//     (n.prototype.clean_nodes = a(
//       n.prototype.cleanNodes,
//       'clean_nodes',
//       'cleanNodes'
//     )),
//     (n.prototype.get_dirty_nodes = a(
//       n.prototype.getDirtyNodes,
//       'get_dirty_nodes',
//       'getDirtyNodes'
//     )),
//     (n.prototype.add_node = a(n.prototype.addNode, 'add_node', 'addNode, ')),
//     (n.prototype.remove_node = a(
//       n.prototype.removeNode,
//       'remove_node',
//       'removeNode'
//     )),
//     (n.prototype.can_move_node = a(
//       n.prototype.canMoveNode,
//       'can_move_node',
//       'canMoveNode'
//     )),
//     (n.prototype.move_node = a(n.prototype.moveNode, 'move_node', 'moveNode')),
//     (n.prototype.get_grid_height = a(
//       n.prototype.getGridHeight,
//       'get_grid_height',
//       'getGridHeight'
//     )),
//     (n.prototype.begin_update = a(
//       n.prototype.beginUpdate,
//       'begin_update',
//       'beginUpdate'
//     )),
//     (n.prototype.end_update = a(
//       n.prototype.endUpdate,
//       'end_update',
//       'endUpdate'
//     )),
//     (n.prototype.can_be_placed_with_respect_to_height = a(
//       n.prototype.canBePlacedWithRespectToHeight,
//       'can_be_placed_with_respect_to_height',
//       'canBePlacedWithRespectToHeight'
//     )),
//     (h.prototype._trigger_change_event = a(
//       h.prototype._triggerChangeEvent,
//       '_trigger_change_event',
//       '_triggerChangeEvent'
//     )),
//     (h.prototype._init_styles = a(
//       h.prototype._initStyles,
//       '_init_styles',
//       '_initStyles'
//     )),
//     (h.prototype._update_styles = a(
//       h.prototype._updateStyles,
//       '_update_styles',
//       '_updateStyles'
//     )),
//     (h.prototype._update_container_height = a(
//       h.prototype._updateContainerHeight,
//       '_update_container_height',
//       '_updateContainerHeight'
//     )),
//     (h.prototype._is_one_column_mode = a(
//       h.prototype._isOneColumnMode,
//       '_is_one_column_mode',
//       '_isOneColumnMode'
//     )),
//     (h.prototype._prepare_element = a(
//       h.prototype._prepareElement,
//       '_prepare_element',
//       '_prepareElement'
//     )),
//     (h.prototype.set_animation = a(
//       h.prototype.setAnimation,
//       'set_animation',
//       'setAnimation'
//     )),
//     (h.prototype.add_widget = a(
//       h.prototype.addWidget,
//       'add_widget',
//       'addWidget'
//     )),
//     (h.prototype.make_widget = a(
//       h.prototype.makeWidget,
//       'make_widget',
//       'makeWidget'
//     )),
//     (h.prototype.will_it_fit = a(
//       h.prototype.willItFit,
//       'will_it_fit',
//       'willItFit'
//     )),
//     (h.prototype.remove_widget = a(
//       h.prototype.removeWidget,
//       'remove_widget',
//       'removeWidget'
//     )),
//     (h.prototype.remove_all = a(
//       h.prototype.removeAll,
//       'remove_all',
//       'removeAll'
//     )),
//     (h.prototype.min_height = a(
//       h.prototype.minHeight,
//       'min_height',
//       'minHeight'
//     )),
//     (h.prototype.min_width = a(h.prototype.minWidth, 'min_width', 'minWidth')),
//     (h.prototype._update_element = a(
//       h.prototype._updateElement,
//       '_update_element',
//       '_updateElement'
//     )),
//     (h.prototype.cell_height = a(
//       h.prototype.cellHeight,
//       'cell_height',
//       'cellHeight'
//     )),
//     (h.prototype.cell_width = a(
//       h.prototype.cellWidth,
//       'cell_width',
//       'cellWidth'
//     )),
//     (h.prototype.get_cell_from_pixel = a(
//       h.prototype.getCellFromPixel,
//       'get_cell_from_pixel',
//       'getCellFromPixel'
//     )),
//     (h.prototype.batch_update = a(
//       h.prototype.batchUpdate,
//       'batch_update',
//       'batchUpdate'
//     )),
//     (h.prototype.is_area_empty = a(
//       h.prototype.isAreaEmpty,
//       'is_area_empty',
//       'isAreaEmpty'
//     )),
//     (h.prototype.set_static = a(
//       h.prototype.setStatic,
//       'set_static',
//       'setStatic'
//     )),
//     (h.prototype._set_static_class = a(
//       h.prototype._setStaticClass,
//       '_set_static_class',
//       '_setStaticClass'
//     )),
//     (o.GridStackUI = h),
//     (o.GridStackUI.Utils = r),
//     (o.GridStackUI.Engine = n),
//     (o.GridStackUI.GridStackDragDropPlugin = i),
//     (t.fn.gridstack = function (e) {
//       return this.each(function () {
//         var i = t(this);
//         i.data('gridstack') || i.data('gridstack', new h(this, e));
//       });
//     }),
//     o.GridStackUI
//   );
// });
// /**
//  * gridstack.js 0.3.0
//  * http://troolee.github.io/gridstack.js/
//  * (c) 2014-2016 Pavel Reznikov, Dylan Weiss
//  * gridstack.js may be freely distributed under the MIT license.
//  * @preserve
//  */
// !(function (e) {
//   if ('function' == typeof define && define.amd)
//     define([
//       'jquery',
//       'lodash',
//       'gridstack',
//       'jquery-ui/data',
//       'jquery-ui/disable-selection',
//       'jquery-ui/focusable',
//       'jquery-ui/form',
//       'jquery-ui/ie',
//       'jquery-ui/keycode',
//       'jquery-ui/labels',
//       'jquery-ui/jquery-1-7',
//       'jquery-ui/plugin',
//       'jquery-ui/safe-active-element',
//       'jquery-ui/safe-blur',
//       'jquery-ui/scroll-parent',
//       'jquery-ui/tabbable',
//       'jquery-ui/unique-id',
//       'jquery-ui/version',
//       'jquery-ui/widget',
//       'jquery-ui/widgets/mouse',
//       'jquery-ui/widgets/draggable',
//       'jquery-ui/widgets/droppable',
//       'jquery-ui/widgets/resizable',
//     ], e);
//   else if ('undefined' != typeof exports) {
//     try {
//       jQuery = require('jquery');
//     } catch (e) {}
//     try {
//       _ = require('lodash');
//     } catch (e) {}
//     try {
//       GridStackUI = require('gridstack');
//     } catch (e) {}
//     e(jQuery, _, GridStackUI);
//   } else e(jQuery, _, GridStackUI);
// })(function (e, r, t) {
//   function i(e) {
//     t.GridStackDragDropPlugin.call(this, e);
//   }
//   return (
//     window,
//     t.GridStackDragDropPlugin.registerPlugin(i),
//     (i.prototype = Object.create(t.GridStackDragDropPlugin.prototype)),
//     (i.prototype.constructor = i),
//     (i.prototype.resizable = function (t, i) {
//       if (((t = e(t)), 'disable' === i || 'enable' === i)) t.resizable(i);
//       else if ('option' === i) {
//         var u = arguments[2],
//           a = arguments[3];
//         t.resizable(i, u, a);
//       } else
//         t.resizable(
//           r.extend({}, this.grid.opts.resizable, {
//             start: i.start || function () {},
//             stop: i.stop || function () {},
//             resize: i.resize || function () {},
//           })
//         );
//       return this;
//     }),
//     (i.prototype.draggable = function (t, i) {
//       return (
//         (t = e(t)),
//         'disable' === i || 'enable' === i
//           ? t.draggable(i)
//           : t.draggable(
//               r.extend({}, this.grid.opts.draggable, {
//                 containment: this.grid.opts.isNested
//                   ? this.grid.container.parent()
//                   : null,
//                 start: i.start || function () {},
//                 stop: i.stop || function () {},
//                 drag: i.drag || function () {},
//               })
//             ),
//         this
//       );
//     }),
//     (i.prototype.droppable = function (r, t) {
//       return (
//         (r = e(r)),
//         'disable' === t || 'enable' === t
//           ? r.droppable(t)
//           : r.droppable({
//               accept: t.accept,
//             }),
//         this
//       );
//     }),
//     (i.prototype.isDroppable = function (r, t) {
//       return (r = e(r)), Boolean(r.data('droppable'));
//     }),
//     (i.prototype.on = function (r, t, i) {
//       return e(r).on(t, i), this;
//     }),
//     i
//   );
// });
// ('use strict');
// function dashboarddesigner_toggle_widgetselector(t) {
//   var e = document.getElementById('dashboarddesigner');
//   return (
//     0 == t
//       ? e.setAttribute('data-show-widgetselector', 'false')
//       : e.setAttribute('data-show-widgetselector', 'true'),
//     !0
//   );
// }
// function dashboard_sort_widgets(t) {
//   return t.sort(function (t, e) {
//     return t.settings.y < e.settings.y
//       ? -1
//       : t.settings.y == e.settings.y
//         ? t.settings.x < e.settings.x
//           ? -1
//           : 1
//         : t.settings.x > e.settings
//           ? 1
//           : void 0;
//   });
// }
// function dashboarddesigner_init(t, e) {
//   dashboarddesigner_init_dragging(),
//     (window.dashboarddesigner_data = {}),
//     (window.dashboarddesigner_data.guid = t),
//     (window.dashboarddesigner_data.name = e),
//     (window.dashboarddesigner_data.widgets = []);
//   var a = {};
//   return (
//     (a.id = t),
//     $.ajax({
//       url: '/?mode=get-dashboard-widgets',
//       data: a,
//       method: 'POST',
//       dataType: 'json',
//       success: function (t) {
//         dashboard_sort_widgets(t);
//         for (var e = 0; e < t.length; )
//           dashboarddesigner_add_widget(t[e].settings, t[e].guid, t[e].name),
//             e++;
//       },
//     }),
//     topsubbar_init(t),
//     !0
//   );
// }
// function dashboarddesigner_init_dragging() {
//   $('#dashboarddesigner_workspace_list').data('gridstack');
//   $('#dashboarddesigner_workspace_list').gridstack({
//     rowHeight: 120,
//     width: 4,
//     alwaysShowResizeHandle: !0,
//     cellHeight: '120px',
//     verticalMargin: '20px',
//     disableOneColumnMode: !0,
//     animate: !1,
//   }),
//     $('#dashboarddesigner_workspace_list').on('resize', function (t, e) {
//       e.size.width = e.size.width - 20;
//     });
// }
// function dashboarddesigner_toggle_widgetgroup(t) {
//   var e = document.getElementById('dashboarddesigner');
//   return (
//     'false' == t.getAttribute('data-open')
//       ? ($(e)
//           .find('div.toolbox > ul')
//           .children('li')
//           .each(function () {
//             $(this).attr('data-open', 'false');
//           }),
//         t.setAttribute('data-open', 'true'))
//       : t.setAttribute('data-open', 'false'),
//     !0
//   );
// }
// function dashboarddesigner_insert_widget(t, e) {
//   t.preventDefault(), t.stopPropagation();
//   var a = dashboarddesigner_add_widget(window.dashboardwidgetdefaults[e]);
//   return (
//     $('div.dashboarddesigner').attr('data-show-widgetselector', 'false'),
//     $('html, body').animate(
//       {
//         scrollTop: $(a).offset().top,
//       },
//       500
//     ),
//     !0
//   );
// }
// function dashboarddesigner_add_widget(t, e, a) {
//   generate_uuid();
//   for (var s = '', d = 0; d < t.parameters.length; ) {
//     if (1 == t.parameters[d].subtext && 'select' == t.parameters[d].type)
//       for (var i = 0; i < t.parameters[d].options.length; )
//         t.parameters[d].options[i].value == t.parameters[d].value &&
//           (s = t.parameters[d].options[i].name),
//           i++;
//     d++;
//   }
//   0 == s.length && (s = t.subtext);
//   document.getElementById('dashboarddesigner_workspace_list');
//   var n = document.createElement('div');
//   n.setAttribute('class', 'grid-stack-item'),
//     e ? n.setAttribute('data-guid', e) : n.setAttribute('data-guid', ''),
//     n.setAttribute('data-local-id', generate_uuid());
//   var r = document.createElement('div');
//   r.setAttribute('class', 'grid-stack-item-content'), n.appendChild(r);
//   var l = document.createElement('p');
//   (l.innerHTML = t.name), r.appendChild(l);
//   var o = document.createElement('p');
//   (o.innerHTML = s), r.appendChild(o);
//   var u = document.createElement('div');
//   u.setAttribute('class', 'grid-stack-item-edit'),
//     (u.onClick = function () {
//       dashboarddesigner_launch_widgetsettings(
//         this.parentNode.getAttribute('data-local-id')
//       );
//     }),
//     n.appendChild(u);
//   var c = document.createElement('textarea');
//   c.setAttribute('name', 'dashboarddesigner_widget_settings'),
//     c.setAttribute('class', 'dashboarddesigner_widget_settings'),
//     c.setAttribute('rows', 4),
//     c.setAttribute('cols', 40),
//     (c.innerHTML = JSON.stringify(t)),
//     r.appendChild(c);
//   var m = $('#dashboarddesigner_workspace_list').data('gridstack');
//   if ('number' == typeof t.x && 'number' == typeof t.y)
//     var p = m.addWidget(
//       n,
//       t.x,
//       t.y,
//       t.width,
//       t.height,
//       !1,
//       t.min_width,
//       t.max_width,
//       t.min_height,
//       t.max_height
//     );
//   else
//     p = m.addWidget(
//       n,
//       0,
//       0,
//       1,
//       1,
//       !0,
//       t.min_width,
//       t.max_width,
//       t.min_height,
//       t.max_height
//     );
//   return dashboarddesigner_scan_widgets(), p;
// }
// function dashboarddesigner_launch_widgetsettings(t) {
//   document
//     .getElementsByTagName('body')[0]
//     .setAttribute('data-mobile-dialogue', 'true');
//   var e = JSON.parse(
//       $(
//         "#dashboarddesigner_workspace_list > div[data-local-id='" +
//           t +
//           "'].grid-stack-item > div.grid-stack-item-content > textarea.dashboarddesigner_widget_settings"
//       ).val()
//     ),
//     a = document.createElement('div');
//   a.setAttribute('class', 'dashboarddesigner_widgetsettings_overlay'),
//     a.setAttribute('id', 'dashboarddesigner_widgetsettings_overlay'),
//     document.getElementsByTagName('body')[0].appendChild(a);
//   var s = document.createElement('div');
//   s.setAttribute('class', 'box'), a.appendChild(s);
//   var d = document.createElement('h1');
//   (d.innerHTML = e.name), s.appendChild(d);
//   var i = document.createElement('p');
//   (i.innerHTML = e.helptext), s.appendChild(i);
//   var n = document.createElement('p');
//   (n.innerHTML = ''),
//     n.setAttribute('id', 'dashboarddesigner_widgetsettings_field_help_message'),
//     s.appendChild(n);
//   var r = document.createElement('form');
//   r.setAttribute('method', 'post'),
//     r.setAttribute('action', '/'),
//     r.setAttribute('data-local-id', t),
//     (r.onsubmit = function (a) {
//       a.preventDefault();
//       var s = '',
//         d = 0;
//       submitwarn_set();
//       for (var i = !0, n = $(this), r = []; d < e.parameters.length; ) {
//         if ('io-states' === e.parameters[d].systemname) {
//           var l = [];
//           n.find("[data-name='case']").each(function (t, e) {
//             var a = $(e)
//               .find("[data-name='if-output'],[data-name='if-input']")
//               .map(function () {
//                 return 'true' === this.dataset.state ? 1 : 0;
//               })
//               .toArray()
//               .join();
//             -1 === l.indexOf(a)
//               ? (l.push(a), $(this).find('.errors').html(''))
//               : (0 === $(this).find('.errors').length &&
//                   $(this).prepend('<div className="errors"></div>'),
//                 $(this).find('.errors').html(mir_translate('bt_invalid_case')),
//                 (i = !1),
//                 r.push(mir_translate('invalid_data_supplied')));
//           });
//         }
//         d++;
//       }
//       var o = $(
//           '#' + this.getAttribute('data-local-id') + '_allow_pickup_cart'
//         ),
//         u = $('#' + this.getAttribute('data-local-id') + '_allow_place_cart');
//       if (
//         (1 === o.length &&
//           1 === u.length &&
//           (o.is(':checked') ||
//             u.is(':checked') ||
//             ((i = !1),
//             r.push(
//               mir_translate(
//                 'hook_cart_error_at_least_one_functionality_should_be_allowed'
//               )
//             ))),
//         !i)
//       )
//         return (
//           0 === n.find('#main-error').length
//             ? n.prepend('<div id="main-error" className="errors"></div>')
//             : n.find('#main-error').html(''),
//           $.each(r, function () {
//             n.find('#main-error').append(
//               '<div className="error">' + this + '</div>'
//             );
//           }),
//           !1
//         );
//       for (d = 0; d < e.parameters.length; ) {
//         if ('select' == e.parameters[d].type)
//           (e.parameters[d].value = $(
//             '#' +
//               this.getAttribute('data-local-id') +
//               '_' +
//               e.parameters[d].systemname
//           ).val()),
//             1 == e.parameters[d].subtext &&
//               (s = $(
//                 '#' +
//                   this.getAttribute('data-local-id') +
//                   '_' +
//                   e.parameters[d].systemname +
//                   ' option:selected'
//               ).text());
//         else if ('input' == e.parameters[d].type)
//           e.parameters[d].value = $(
//             '#' +
//               this.getAttribute('data-local-id') +
//               '_' +
//               e.parameters[d].systemname
//           ).val();
//         else if ('checkbox' == e.parameters[d].type)
//           if (void 0 !== e.parameters[d].choices) {
//             var c = [];
//             e.parameters[d].choices.forEach(function (a, s) {
//               $('#' + s + '_' + t + '_' + e.parameters[d].systemname).is(
//                 ':checked'
//               ) && c.push(a.value);
//             }),
//               (e.parameters[d].value = c);
//           } else
//             e.parameters[d].value = $(
//               '#' +
//                 this.getAttribute('data-local-id') +
//                 '_' +
//                 e.parameters[d].systemname
//             ).is(':checked')
//               ? 'true'
//               : 'false';
//         else if ('registercasesetup' == e.parameters[d].type) {
//           e.parameters[d].value = '';
//           var m = this.getAttribute('data-local-id'),
//             p = e.parameters[d].systemname,
//             _ = $(
//               '#' +
//                 this.getAttribute('data-local-id') +
//                 '_' +
//                 e.parameters[d].systemname +
//                 '_casesetup_holder'
//             ),
//             h = [];
//           $(_)
//             .children('table.casesetup_table')
//             .find('tr.case')
//             .each(function () {
//               var t = document.getElementById(
//                   m +
//                     '_' +
//                     p +
//                     '_casesetup_holder_casesetup_case_value_' +
//                     this.getAttribute('data-count')
//                 ).value,
//                 e = document.getElementById(
//                   m +
//                     '_' +
//                     p +
//                     '_casesetup_holder_casesetup_case_text_' +
//                     this.getAttribute('data-count')
//                 ).value,
//                 a = document.getElementById(
//                   m +
//                     '_' +
//                     p +
//                     '_casesetup_holder_casesetup_case_actiontype_' +
//                     this.getAttribute('data-count')
//                 ).options[
//                   document.getElementById(
//                     m +
//                       '_' +
//                       p +
//                       '_casesetup_holder_casesetup_case_actiontype_' +
//                       this.getAttribute('data-count')
//                   ).selectedIndex
//                 ].value,
//                 s = document.getElementById(
//                   m +
//                     '_' +
//                     p +
//                     '_casesetup_holder_casesetup_case_action_' +
//                     this.getAttribute('data-count')
//                 ).value;
//               if (
//                 ((t = '*' == t ? '*' : parseFloat(t)),
//                 (s = parseFloat(s)),
//                 1 == isNaN(s) && (s = 0),
//                 0 == isNaN(t) || '*' == t)
//               ) {
//                 var d = {};
//                 (d.state = t),
//                   (d.text = e),
//                   (d.actiontype = a),
//                   (d.action = s),
//                   h.push(d);
//               }
//             }),
//             (e.parameters[d].value = JSON.stringify(h));
//         } else if ('io_case_setup' == e.parameters[d].type) {
//           var b = {
//             cases: [],
//             default: {},
//           };
//           (n = $(this)).find("[data-name='case']").each(function (t, e) {
//             b.cases.push({
//               button_text: $(e).find("[data-name='button-text']").val(),
//               if_output: $(e)
//                 .find("[data-name='if-output']")
//                 .map(function () {
//                   return 'true' === this.dataset.state;
//                 })
//                 .toArray(),
//               if_input: $(e)
//                 .find("[data-name='if-input']")
//                 .map(function () {
//                   return 'true' === this.dataset.state;
//                 })
//                 .toArray(),
//               then_output: $(e)
//                 .find("[data-name='then-output']")
//                 .map(function () {
//                   return 'true' === this.dataset.state;
//                 })
//                 .toArray(),
//             });
//           });
//           var g = n.find("[data-name='default']");
//           1 === g.length &&
//             (b.default = {
//               button_text: g.find("[data-name='button-text']").val(),
//               default_output: g
//                 .find("[data-name='default-output']")
//                 .map(function () {
//                   return 'true' === this.dataset.state;
//                 })
//                 .toArray(),
//             }),
//             (e.parameters[d].value = JSON.stringify(b));
//         }
//         d++;
//       }
//       return (
//         0 == s.length && (s = mir_translate('No settings')),
//         $(
//           "#dashboarddesigner_workspace_list > div[data-local-id='" +
//             t +
//             "'].grid-stack-item > div.grid-stack-item-content"
//         )
//           .children('p:nth-child(2)')
//           .html(s),
//         $(
//           "#dashboarddesigner_workspace_list > div[data-local-id='" +
//             t +
//             "'].grid-stack-item > div.grid-stack-item-content > textarea.dashboarddesigner_widget_settings"
//         ).val(JSON.stringify(e)),
//         document
//           .getElementsByTagName('body')[0]
//           .setAttribute('data-mobile-dialogue', 'false'),
//         document
//           .getElementById('dashboarddesigner_widgetsettings_overlay')
//           .parentNode.removeChild(
//             parent.document.getElementById(
//               'dashboarddesigner_widgetsettings_overlay'
//             )
//           ),
//         !1
//       );
//     }),
//     s.appendChild(r);
//   for (var l, o, u, c = 0; c < e.parameters.length; ) {
//     if ('select' == e.parameters[c].type) {
//       var m = $('<label></label>');
//       m.html(e.parameters[c].name), $(r).append(m);
//       var p = document.createElement('select');
//       p.setAttribute('name', e.parameters[c].systemname),
//         p.setAttribute('class', 'full'),
//         p.setAttribute('id', t + '_' + e.parameters[c].systemname),
//         r.appendChild(p);
//       for (var _ = 0; _ < e.parameters[c].options.length; ) {
//         var h = document.createElement('option');
//         h.setAttribute('value', e.parameters[c].options[_].value),
//           (h.innerHTML = e.parameters[c].options[_].name),
//           e.parameters[c].options[_].value == e.parameters[c].value &&
//             h.setAttribute('selected', 'selected'),
//           p.appendChild(h),
//           _++;
//       }
//     } else if ('input' == e.parameters[c].type)
//       $(
//         '<label for="' +
//           t +
//           '_' +
//           e.parameters[c].systemname +
//           '">' +
//           e.parameters[c].name +
//           '</label>'
//       ).appendTo(r),
//         $('<input />')
//           .attr(e.parameters[c].attributes)
//           .attr('id', t + '_' + e.parameters[c].systemname)
//           .val(
//             '' !== e.parameters[c].value
//               ? e.parameters[c].value
//               : e.parameters[c].default
//           )
//           .appendTo(r);
//     else if ('checkbox' == e.parameters[c].type) {
//       var b = e.parameters[c];
//       if (void 0 !== b.choices) {
//         $('<h3>' + b.name + '</h3>').appendTo(r);
//         var g = $('<div className="row"></div>');
//         b.choices.forEach(function (e, a) {
//           var s =
//             (('' === b.value || !1 === b.value) &&
//               -1 !== b.default.indexOf(e.value)) ||
//             (!1 !== b.value && -1 !== b.value.indexOf(e.value))
//               ? 'checked="checked"'
//               : '';
//           $(
//             '<div className="col-12 col-sm-6 flex align-center"><div className="grow" trigger-element="#' +
//               a +
//               '_' +
//               t +
//               '_' +
//               b.systemname +
//               '">' +
//               e.name +
//               '</div><div className="shrink"><input type="checkbox" className="mir-switch" name="' +
//               b.systemname +
//               '" id="' +
//               a +
//               '_' +
//               t +
//               '_' +
//               b.systemname +
//               '" ' +
//               s +
//               ' /><label for="' +
//               a +
//               '_' +
//               t +
//               '_' +
//               b.systemname +
//               '"></label></div></div>'
//           ).appendTo(g);
//         }),
//           g.appendTo(r);
//       } else
//         $(
//           '<label>' +
//             b.name +
//             '<input type="checkbox" name="' +
//             b.systemname +
//             '" id="' +
//             t +
//             '_' +
//             b.systemname +
//             '"' +
//             ('true' === b.value ? ' checked' : '') +
//             '></label>'
//         ).appendTo(r);
//     } else if ('registercasesetup' == e.parameters[c].type) {
//       var v = JSON.parse(e.parameters[c].value),
//         w = document.createElement('div');
//       w.setAttribute(
//         'id',
//         t + '_' + e.parameters[c].systemname + '_casesetup_holder'
//       ),
//         w.setAttribute('class', 'casesetup_holder'),
//         r.appendChild(w),
//         document
//           .getElementById(t + '_' + e.parameters[c].register_selector)
//           .setAttribute('data-main-id', t),
//         document
//           .getElementById(t + '_' + e.parameters[c].register_selector)
//           .setAttribute('data-main-sysname', e.parameters[c].systemname),
//         (document.getElementById(
//           t + '_' + e.parameters[c].register_selector
//         ).onchange = function () {
//           '' == this.options[this.selectedIndex].value
//             ? $(
//                 '#' +
//                   this.getAttribute('data-main-id') +
//                   '_' +
//                   this.getAttribute('data-main-sysname') +
//                   '_casesetup_holder'
//               ).hide()
//             : $(
//                 '#' +
//                   this.getAttribute('data-main-id') +
//                   '_' +
//                   this.getAttribute('data-main-sysname') +
//                   '_casesetup_holder'
//               ).show();
//         }),
//         '' ==
//         document.getElementById(t + '_' + e.parameters[c].register_selector)
//           .options[
//           document.getElementById(t + '_' + e.parameters[c].register_selector)
//             .selectedIndex
//         ].value
//           ? $(
//               '#' + t + '_' + e.parameters[c].systemname + '_casesetup_holder'
//             ).hide()
//           : $(
//               '#' + t + '_' + e.parameters[c].systemname + '_casesetup_holder'
//             ).show();
//       var f = document.createElement('table');
//       f.setAttribute('cellpadding', '0'),
//         f.setAttribute('cellspacing', '0'),
//         f.setAttribute('class', 'casesetup_table'),
//         w.appendChild(f);
//       var y,
//         A = document.createElement('tr');
//       f.appendChild(A),
//         ((y = document.createElement('th')).innerHTML =
//           '<div>' + mir_translate('Case') + '</div>'),
//         A.appendChild(y),
//         ((y = document.createElement('th')).innerHTML =
//           '<div>' + mir_translate('Text') + '</div>'),
//         A.appendChild(y),
//         (y = document.createElement('th')).setAttribute('colspan', '3'),
//         (y.innerHTML = '<div>' + mir_translate('Click-action') + '</div>'),
//         A.appendChild(y);
//       var E = document.createElement('div');
//       E.setAttribute('class', 'addstatebutton'),
//         E.setAttribute(
//           'data-holder-id',
//           t + '_' + e.parameters[c].systemname + '_casesetup_holder'
//         ),
//         (E.innerHTML = mir_translate('Add another case')),
//         (E.onClick = function () {
//           dashboarddesigner_registercasesetup_add_case(
//             this.getAttribute('data-holder-id')
//           );
//         }),
//         w.appendChild(E),
//         (window.dashboarddesigner_widgetsettings_plc_statetable_counter = 0);
//       for (_ = 0; _ < v.length; ) {
//         var x = dashboarddesigner_registercasesetup_add_case(
//           t + '_' + e.parameters[c].systemname + '_casesetup_holder'
//         );
//         (document.getElementById(
//           t +
//             '_' +
//             e.parameters[c].systemname +
//             '_casesetup_holder_casesetup_case_value_' +
//             x
//         ).value = v[_].state),
//           (document.getElementById(
//             t +
//               '_' +
//               e.parameters[c].systemname +
//               '_casesetup_holder_casesetup_case_text_' +
//               x
//           ).value = v[_].text),
//           $(
//             '#' +
//               t +
//               '_' +
//               e.parameters[c].systemname +
//               '_casesetup_holder_casesetup_case_actiontype_' +
//               x
//           ).val(v[_].actiontype),
//           (document.getElementById(
//             t +
//               '_' +
//               e.parameters[c].systemname +
//               '_casesetup_holder_casesetup_case_action_' +
//               x
//           ).value = v[_].action),
//           _++;
//       }
//       0 == _ &&
//         dashboarddesigner_registercasesetup_add_case(
//           t + '_' + e.parameters[c].systemname + '_casesetup_holder'
//         );
//     } else if ('io_case_setup' == e.parameters[c].type) {
//       var k = e.parameters[c],
//         C = JSON.parse(k.value),
//         I = $(
//           [
//             '<div id="' +
//               t +
//               '_' +
//               k.systemname +
//               '_casesetup_holder" className="io-states-wrapper">',
//             '\t<label className="mir-label">' +
//               mir_translate('States') +
//               '</label>',
//             '\t<div className="errors"></div>',
//             '\t<div className="case-box io-states"></div>',
//             '\t<span data-name="add-case-btn" className="mir-btn mir-btn-sm mir-green"><i className="mir-i mir-i-plus"></i> ' +
//               mir_translate('Add state') +
//               '</span>',
//             '\t<br><br>',
//             '\t<label className="mir-label">' +
//               mir_translate('Reset') +
//               '</label>',
//             '\t<div className="case-box io-reset"></div>',
//             '</div>',
//           ].join('\n')
//         ),
//         T = I.find('.io-states'),
//         S = I.find('.io-reset'),
//         B = I.find("[data-name='add-case-btn']"),
//         O = function (t, e) {
//           var a = $.extend(
//             {
//               button_text: '',
//               if_output: [!1, !1, !1, !1],
//               if_input: [!1, !1, !1, !1],
//               then_output: [!1, !1, !1, !1],
//             },
//             e
//           );
//           t.append(
//             [
//               '<div data-name="case">',
//               '\t<div className="mir-form-element">',
//               '\t\t<label className="mir-label">' +
//                 mir_translate('State label') +
//                 '</label>',
//               '\t\t<input className="mir-field" data-name="button-text" type="text" value="' +
//                 a.button_text +
//                 '">',
//               '\t</div>',
//               '\t<div>',
//               '\t\t<div>',
//               '\t\t\t<label className="mir-label switch">Output 1<span data-name="if-output" data-state="' +
//                 a.if_output[0].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t\t<label className="mir-label switch">Output 2<span data-name="if-output" data-state="' +
//                 a.if_output[1].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t\t<label className="mir-label switch">Output 3<span data-name="if-output" data-state="' +
//                 a.if_output[2].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t\t<label className="mir-label switch">Output 4<span data-name="if-output" data-state="' +
//                 a.if_output[3].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t</div>',
//               '\t\t<div>',
//               '\t\t\t<label className="mir-label switch">Input 1<span data-name="if-input" data-state="' +
//                 a.if_input[0].toString() +
//                 '" className="switch-input"></span></label>',
//               1 in a.if_input
//                 ? '\t\t\t<label className="mir-label switch">Input 2<span data-name="if-input" data-state="' +
//                   a.if_input[1].toString() +
//                   '" className="switch-input"></span></label>'
//                 : '',
//               2 in a.if_input
//                 ? '\t\t\t<label className="mir-label switch">Input 3<span data-name="if-input" data-state="' +
//                   a.if_input[2].toString() +
//                   '" className="switch-input"></span></label>'
//                 : '',
//               3 in a.if_input
//                 ? '\t\t\t<label className="mir-label switch">Input 4<span data-name="if-input" data-state="' +
//                   a.if_input[3].toString() +
//                   '" className="switch-input"></span></label>'
//                 : '',
//               '\t\t</div>',
//               '\t\t<hr>',
//               '\t\t<div>',
//               '\t\t\t<label className="mir-label switch">Output 1<span data-name="then-output" data-state="' +
//                 a.then_output[0].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t\t<label className="mir-label switch">Output 2<span data-name="then-output" data-state="' +
//                 a.then_output[1].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t\t<label className="mir-label switch">Output 3<span data-name="then-output" data-state="' +
//                 a.then_output[2].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t\t<label className="mir-label switch">Output 4<span data-name="then-output" data-state="' +
//                 a.then_output[3].toString() +
//                 '" className="switch-input"></span></label>',
//               '\t\t</div>',
//               '\t</div>',
//               '\t<br>',
//               ' \t<div className="mir-txt-right">',
//               '\t\t<span data-name="remove-case-btn" className="mir-btn mir-btn-sm mir-red"><i className="mir-i mir-i-del"></i> ' +
//                 mir_translate('remove') +
//                 '</span>',
//               '\t</div>',
//               '</div>',
//             ].join('\n')
//           );
//         };
//       $(r).append(I),
//         C.cases
//           ? $.each(C.cases, function (t, e) {
//               O(T, e);
//             })
//           : O(T),
//         (l = S),
//         (o = C.default),
//         (u = void 0),
//         (u = $.extend(
//           {
//             button_text: '',
//             default_output: [!1, !1, !1, !1],
//           },
//           o
//         )),
//         l.append(
//           [
//             '<div data-name="default">',
//             '\t<div className="mir-form-element">',
//             '\t\t<label className="mir-label">' +
//               mir_translate('Reset label') +
//               '</label>',
//             '\t\t<input className="mir-field" data-name="button-text" type="text" value="' +
//               u.button_text +
//               '">',
//             '\t</div>',
//             '\t<div>',
//             '\t\t<label className="mir-label switch">Output 1<span data-name="default-output" data-state="' +
//               u.default_output[0].toString() +
//               '" className="switch-input"></span></label>',
//             '\t\t<label className="mir-label switch">Output 2<span data-name="default-output" data-state="' +
//               u.default_output[1].toString() +
//               '" className="switch-input"></span></label>',
//             '\t\t<label className="mir-label switch">Output 3<span data-name="default-output" data-state="' +
//               u.default_output[2].toString() +
//               '" className="switch-input"></span></label>',
//             '\t\t<label className="mir-label switch">Output 4<span data-name="default-output" data-state="' +
//               u.default_output[3].toString() +
//               '" className="switch-input"></span></label>',
//             '\t</div>',
//             '</div>',
//           ].join('\n')
//         ),
//         B.on('click', function () {
//           O(T);
//         }),
//         I.on(
//           'click',
//           "[data-name='if-output'],[data-name='if-input'],[data-name='then-output'],[data-name='default-output']",
//           function () {
//             var t = $(this);
//             t.attr(
//               'data-state',
//               'true' === t.attr('data-state') ? 'false' : 'true'
//             );
//           }
//         ).on('click', "[data-name='remove-case-btn']", function () {
//           $(this).parents("[data-name='case']").remove();
//         });
//     }
//     var j = e.parameters[c];
//     if (void 0 !== j.dependency) {
//       var N = $('#' + t + '_' + j.dependency.systemname),
//         H = $('#' + t + '_' + j.systemname),
//         M = $('[for="' + t + '_' + j.systemname + '"]');
//       H.attr('dependency-value', j.dependency.value),
//         N.val() !== j.dependency.value && (H.hide(), M.hide()),
//         N.change(function () {
//           if (N.val() !== H.attr('dependency-value'))
//             return H.hide(), void M.hide();
//           H.show(), M.show();
//         });
//     }
//     c++;
//   }
//   var L = document.createElement('div');
//   L.setAttribute('class', 'buttonholder'), r.appendChild(L);
//   var R = document.createElement('input');
//   R.setAttribute('type', 'submit'),
//     R.setAttribute('name', 'dashboarddesigner_widgetsettings_submitbtn'),
//     R.setAttribute('id', 'dashboarddesigner_widgetsettings_submitbtn'),
//     R.setAttribute('value', mir_translate('Close')),
//     L.appendChild(R);
//   var J = document.createElement('input');
//   J.setAttribute('type', 'button'),
//     J.setAttribute('name', 'dashboarddesigner_widgetsettings_delbtn'),
//     J.setAttribute('id', 'dashboarddesigner_widgetsettings_delbtn'),
//     J.setAttribute('data-local-id', t),
//     J.setAttribute('value', mir_translate('Delete')),
//     (J.onClick = function () {
//       submitwarn_set();
//       var t = $('#dashboarddesigner_workspace_list').children(
//         "div[data-local-id='" +
//           this.getAttribute('data-local-id') +
//           "'].grid-stack-item"
//       );
//       $('#dashboarddesigner_workspace_list').data('gridstack').removeWidget(t),
//         document
//           .getElementsByTagName('body')[0]
//           .setAttribute('data-mobile-dialogue', 'false'),
//         document
//           .getElementById('dashboarddesigner_widgetsettings_overlay')
//           .parentNode.removeChild(
//             parent.document.getElementById(
//               'dashboarddesigner_widgetsettings_overlay'
//             )
//           );
//     }),
//     L.appendChild(J);
//   var z = document.createElement('input');
//   return (
//     z.setAttribute('type', 'button'),
//     z.setAttribute('name', 'dashboarddesigner_widgetsettings_cancelbtn'),
//     z.setAttribute('id', 'dashboarddesigner_widgetsettings_cancelbtn'),
//     z.setAttribute('value', mir_translate('Cancel')),
//     L.appendChild(z),
//     (z.onClick = function () {
//       document
//         .getElementsByTagName('body')[0]
//         .setAttribute('data-mobile-dialogue', 'false'),
//         document
//           .getElementById('dashboarddesigner_widgetsettings_overlay')
//           .parentNode.removeChild(
//             parent.document.getElementById(
//               'dashboarddesigner_widgetsettings_overlay'
//             )
//           );
//     }),
//     !0
//   );
// }
// function dashboarddesigner_registercasesetup_add_case(t) {
//   var e,
//     a,
//     s = document.getElementById(t),
//     d = $(s).children('table.casesetup_table'),
//     i = document.createElement('tr');
//   i.setAttribute('class', 'case'),
//     i.setAttribute(
//       'data-count',
//       window.dashboarddesigner_widgetsettings_plc_statetable_counter
//     ),
//     i.setAttribute(
//       'id',
//       t +
//         '_casesetup_case_' +
//         window.dashboarddesigner_widgetsettings_plc_statetable_counter
//     ),
//     $(d).append(i),
//     (a = document.createElement('input')).setAttribute('type', 'text'),
//     a.setAttribute('value', ''),
//     a.setAttribute('maxlength', '10'),
//     a.setAttribute(
//       'id',
//       t +
//         '_casesetup_case_value_' +
//         window.dashboarddesigner_widgetsettings_plc_statetable_counter
//     ),
//     a.setAttribute('name', t + '_casesetup_case_value[]'),
//     (n = document.createElement('td')).appendChild(a),
//     i.appendChild(n),
//     (a = document.createElement('input')).setAttribute('type', 'text'),
//     a.setAttribute('value', ''),
//     a.setAttribute('maxlength', '25'),
//     a.setAttribute(
//       'id',
//       t +
//         '_casesetup_case_text_' +
//         window.dashboarddesigner_widgetsettings_plc_statetable_counter
//     ),
//     a.setAttribute('name', t + '_casesetup_case_text[]'),
//     (n = document.createElement('td')).appendChild(a),
//     i.appendChild(n),
//     (a = document.createElement('select')).setAttribute(
//       'id',
//       t +
//         '_casesetup_case_actiontype_' +
//         window.dashboarddesigner_widgetsettings_plc_statetable_counter
//     ),
//     a.setAttribute('name', t + '_casesetup_case_actiontype[]'),
//     (e = document.createElement('option')).setAttribute('value', 'set'),
//     (e.innerHTML = mir_translate('Set')),
//     a.appendChild(e),
//     (e = document.createElement('option')).setAttribute('value', 'add'),
//     (e.innerHTML = mir_translate('Add')),
//     a.appendChild(e),
//     (e = document.createElement('option')).setAttribute('value', 'subtract'),
//     (e.innerHTML = mir_translate('Subtract')),
//     a.appendChild(e),
//     (n = document.createElement('td')).appendChild(a),
//     i.appendChild(n),
//     (a = document.createElement('input')).setAttribute('type', 'text'),
//     a.setAttribute('value', ''),
//     a.setAttribute('maxlength', '10'),
//     a.setAttribute(
//       'id',
//       t +
//         '_casesetup_case_action_' +
//         window.dashboarddesigner_widgetsettings_plc_statetable_counter
//     ),
//     a.setAttribute('name', t + '_casesetup_case_action[]'),
//     (n = document.createElement('td')).appendChild(a),
//     i.appendChild(n);
//   var n,
//     r = document.createElement('div');
//   r.setAttribute('class', 'deletebutton'),
//     r.setAttribute('data-id', t),
//     r.setAttribute(
//       'data-row',
//       t +
//         '_casesetup_case_' +
//         window.dashboarddesigner_widgetsettings_plc_statetable_counter
//     ),
//     (r.innerHTML = '<span>Delete</span>'),
//     (r.onClick = function () {
//       $('#' + this.getAttribute('data-row')).remove(),
//         0 ==
//           $('#' + this.getAttribute('data-id'))
//             .children('table.casesetup_table')
//             .find('tr.case').length &&
//           dashboarddesigner_registercasesetup_add_case(
//             this.getAttribute('data-id')
//           );
//     }),
//     (n = document.createElement('td')).appendChild(r),
//     i.appendChild(n),
//     document
//       .getElementById(
//         t +
//           '_casesetup_case_value_' +
//           window.dashboarddesigner_widgetsettings_plc_statetable_counter
//       )
//       .focus();
//   var l = window.dashboarddesigner_widgetsettings_plc_statetable_counter;
//   return window.dashboarddesigner_widgetsettings_plc_statetable_counter++, l;
// }
// function dashboarddesigner_scan_widgets() {
//   window.dashboarddesigner_data.widgets = [];
//   var t = document.getElementById('dashboarddesigner_workspace_list');
//   return (
//     $(t)
//       .children('div.grid-stack-item')
//       .each(function () {
//         var t = {};
//         (t.id = this.getAttribute('data-local-id')),
//           (t.guid = this.getAttribute('data-guid')),
//           (t.x = this.getAttribute('data-gs-x')),
//           (t.y = this.getAttribute('data-gs-y')),
//           (t.width = this.getAttribute('data-gs-width')),
//           (t.height = this.getAttribute('data-gs-height')),
//           (t.settings = $(this)
//             .find('textarea.dashboarddesigner_widget_settings')
//             .val()),
//           window.dashboarddesigner_data.widgets.push(t);
//       }),
//     !0
//   );
// }
// function dashboarddesigner_save(t) {
//   t || (t = '/dashboards/' + window.dashboarddesigner_data.guid);
//   var e = $('div.dashboarddesigner > div.header > div.column')
//     .find('li[data-button-template="submit"] > div.mirbutton')
//     .html();
//   return (
//     $('div.dashboarddesigner > div.header > div.column')
//       .find('li[data-button-template="submit"] > div.mirbutton')
//       .attr('data-template', 'submitting'),
//     $('div.dashboarddesigner > div.header > div.column')
//       .find('li[data-button-template="submit"] > div.mirbutton')
//       .html(mir_translate('Saving dashboard...')),
//     $('div.dashboarddesigner > div.header > div.column')
//       .find('li[data-button-template="submit"] > div.mirbutton')
//       .css('pointer-events', 'none'),
//     dashboarddesigner_scan_widgets(),
//     $.ajax({
//       url: '/?mode=save-dashboard',
//       data: window.dashboarddesigner_data,
//       method: 'POST',
//       dataType: 'json',
//       error: function (t) {
//         $('div.dashboarddesigner > div.header > div.column')
//           .find('li[data-button-template="submit"] > div.mirbutton')
//           .attr('data-template', 'submit'),
//           $('div.dashboarddesigner > div.header > div.column')
//             .find('li[data-button-template="submit"] > div.mirbutton')
//             .html(e),
//           $('div.dashboarddesigner > div.header > div.column')
//             .find('li[data-button-template="submit"] > div.mirbutton')
//             .css('pointer-events', ''),
//           launch_error(
//             mir_translate(
//               'It was not possible to save your changes to this dashboard. Please try again.'
//             )
//           );
//       },
//       success: function (a) {
//         $('div.dashboarddesigner > div.header > div.column')
//           .find('li[data-button-template="submit"] > div.mirbutton')
//           .attr('data-template', 'submit'),
//           $('div.dashboarddesigner > div.header > div.column')
//             .find('li[data-button-template="submit"] > div.mirbutton')
//             .html(e),
//           $('div.dashboarddesigner > div.header > div.column')
//             .find('li[data-button-template="submit"] > div.mirbutton')
//             .css('pointer-events', ''),
//           resetChanges();
//         for (
//           var s = document.getElementById('dashboarddesigner_workspace_list'),
//             d = 0;
//           d < a.length;

//         )
//           $(s)
//             .children("div[data-local-id='" + a[d].id + "'].grid-stack-item")
//             .attr('data-guid', a[d].guid),
//             d++;
//         location.href = t;
//       },
//     }),
//     !0
//   );
// }
// function dashboard_init() {
//   $('#widgetholder')
//     .gridstack({
//       rowHeight: 120,
//       width: 4,
//       alwaysShowResizeHandle: !1,
//       cellHeight: '120px',
//       verticalMargin: '20px',
//       disableOneColumnMode: !0,
//       staticGrid: !0,
//       disableDrag: !0,
//       disableResize: !0,
//     })
//     .on('added', function (t, e) {
//       $.each(e, function (t, e) {
//         $(e.el).find('.ui-draggable-handle').removeClass('ui-draggable-handle');
//       });
//     }),
//     (window.dashboard_widget_count = 0),
//     (window.dashboard_loaded_scripts = []),
//     (window.dashboard_loaded_styles = []),
//     (window.dashboard_loaded_permissions = []),
//     (window.dashboard_widget_settings = {}),
//     dashboard_load_widgets(
//       $('#widgetholder').parent().attr('data-dashboard-id')
//     );
// }
// function dashboard_load_widgets(guid) {
//   window.dashboard_jsloader_initscripts = [];
//   var fields = {};
//   (fields.id = guid),
//     $.ajax({
//       url: '/?mode=get-dashboard-widgets',
//       data: fields,
//       method: 'POST',
//       dataType: 'json',
//       error: function (t) {
//         launch_error(
//           mir_translate(
//             'This dashboard contains errors and can therefore not be loaded.'
//           ),
//           '/dashboards'
//         );
//       },
//       success: function success(data) {
//         (window.dashboard_jsloader_initing = !0),
//           (window.dashboard_jsloader_started = 0),
//           (window.dashboard_jsloader_loaded = 0),
//           (window.dashboard_jsloader_agent = window.setInterval(function () {
//             if (
//               0 == window.dashboard_jsloader_initing &&
//               window.dashboard_jsloader_loaded ==
//                 window.dashboard_jsloader_started
//             ) {
//               for (
//                 var c = 0;
//                 c < window.dashboard_jsloader_initscripts.length;

//               )
//                 eval(window.dashboard_jsloader_initscripts[c]), c++;
//               window.dashboard_jsloader_initscripts = [];
//             } else
//               0 == window.dashboard_jsloader_initing &&
//                 window.dashboard_jsloader_loaded;
//           }, 300)),
//           dashboard_sort_widgets(data);
//         for (var c = 0; c < data.length; )
//           dashboard_add_widget(data[c].settings, data[c].guid, data[c].name),
//             window.dashboard_widget_count++,
//             c++;
//         (window.dashboard_jsloader_initing = !1),
//           (document.getElementById('dashboard_widget_count_display').innerHTML =
//             mir_translate('Contains %(number)s widget(s)', {
//               number: window.dashboard_widget_count,
//             }));
//       },
//     });
// }
// function dashboard_add_widget(t, e, a) {
//   var s = document.getElementsByTagName('head')[0];
//   document.getElementById('widgetholder');
//   window.dashboard_widget_settings[e] = t;
//   var d = document.createElement('div');
//   d.setAttribute('class', 'grid-stack-item widget'),
//     d.setAttribute('data-guid', e),
//     d.setAttribute('data-local-id', a),
//     d.setAttribute('data-widget', t.widget);
//   var i = document.createElement('div');
//   i.setAttribute('class', 'grid-stack-item-content'), d.appendChild(i);
//   var n = $('#widgetholder').data('gridstack');
//   if (
//     (n.addWidget(d, t.x, t.y, t.width, t.height, !1),
//     n.update(d, t.x, t.y, t.width, t.height),
//     -1 == window.dashboard_loaded_scripts.indexOf('/static/widgets.min.js'))
//   ) {
//     var r = document.createElement('script');
//     r.setAttribute('type', 'text/javascript'),
//       r.setAttribute('src', '/static/widgets.min.js?v=' + SOFTWARE_VERSION),
//       (r.onload = function () {
//         window.dashboard_jsloader_loaded++;
//       }),
//       s.appendChild(r),
//       window.dashboard_jsloader_started++,
//       window.dashboard_loaded_scripts.push('/static/widgets.min.js');
//   }
//   if (
//     (window.dashboard_jsloader_initscripts.push(
//       'widget_' +
//         t.widget +
//         "_init('" +
//         e +
//         "','" +
//         a +
//         "',$('#widgetholder').children('div[data-guid=" +
//         e +
//         "].widget'));"
//     ),
//     -1 == window.dashboard_loaded_styles.indexOf('/static/widgets.min.css'))
//   ) {
//     var l = document.createElement('link');
//     l.setAttribute('type', 'text/css'),
//       l.setAttribute('rel', 'stylesheet'),
//       l.setAttribute('href', '/static/widgets.min.css?v=' + SOFTWARE_VERSION),
//       s.appendChild(l),
//       window.dashboard_loaded_styles.push('/static/widgets.min.css');
//   }
//   return !0;
// }

// function intersectLineSpline(line, spline, alpha = 0.0, numSamples = 20) {

//   const flatPoints = spline.points;
//   if (!flatPoints || flatPoints.length < 4) return [];

//   const points = [];
//   for (let i = 0; i < flatPoints.length; i += 2) {
//     points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
//   }

//   const intersections = [];

//   const startTime = performance.now(); // ⏱️ Bắt đầu đo thời gian

//   for (let i = 0; i < points.length - 1; i++) {
//     const p0 = points[i - 1] || points[i];
//     const p1 = points[i];
//     const p2 = points[i + 1];
//     const p3 = points[i + 2] || points[i + 1];

//     for (let j = 0; j < numSamples; j++) {
//       const t1 = j / numSamples;
//       const t2 = (j + 1) / numSamples;

//       const pt1 = catmullRomPoint(p0, p1, p2, p3, t1, alpha);
//       const pt2 = catmullRomPoint(p0, p1, p2, p3, t2, alpha);

//       const inter = intersectLineLine(line, {startP: pt1, endP: pt2});
//       if (inter.length > 0) intersections.push(inter[0]);
//     }
//   }

//       const endTime = performance.now(); // ⏱️ Kết thúc
//   console.log(`⏱️ Thời gian chạy ( khôngcó bounding box): ${(endTime - startTime)}ms`);

//   return intersections;
// }

// export const getSnapPoint = (
//   enabledSnapModes,
//   mouse,
//   prevMouse,
//   shapes,
//   gridSize = 20
// ) => {
//   // Tạo các mảng riêng biệt cho từng loại điểm theo thứ tự ưu tiên
//   let midPointCandidates = [];
//   let endPointCandidates = [];
//   let intersectionCandidates = [];
//   let nodePointCandidates = [];
//   let quadrantPointCandidates = [];
//   let perpendicularPointCandidates = [];
//   let tangentPointCandidates = [];
//   let nearestPointCandidates = [];
//   let gridPointCandidates = [];

//   // Thu thập tất cả các loại điểm từ shapes
//   for (const shape of shapes) {
//     const { id: shapeId, startP, endP, points } = shape;

//     // Mid points (ưu tiên cao nhất)
//     if (enabledSnapModes.mid && startP && endP) {
//       midPointCandidates.push({
//         x: (startP.x + endP.x) / 2,
//         y: (startP.y + endP.y) / 2,
//         type: 'mid',
//         shapeId,
//       });
//     }

//     // End points (ưu tiên thứ ba)
//     if (enabledSnapModes.end && endP && startP) {
//       endPointCandidates.push({ ...endP, type: 'end', shapeId });
//       endPointCandidates.push({ ...startP, type: 'end', shapeId });
//     }

//     // Nearest points (ưu tiên thấp)
//     if (enabledSnapModes.nearest && points?.length >= 2) {
//       const nearest = getClosestPointOnPolyline(points, mouse);
//       if (nearest) {
//         nearestPointCandidates.push({ ...nearest, type: 'nearest', shapeId });
//       }
//     }

//     // Node points (ưu tiên thứ năm)
//     if (enabledSnapModes.node) {
//       utils
//         .convertToPointObjects(points)
//         .forEach((p) =>
//           nodePointCandidates.push({ ...p, type: 'node', shapeId })
//         );
//     }

//     if (enabledSnapModes.quadrant) {
//       shapes.forEach((shape) => {
//         if (shape.name.includes('arc') && shape.centerP) {
//           const points = getQuadrantPoints(shape);
//           points.forEach((p) =>
//             quadrantPointCandidates.push({ ...p, type: 'quadrant', shapeId })
//           );
//         } else if (shape.name === 'uline') {
//           const points = getEllipticalArcQuadrantPoints(shape);
//           points.forEach((p) =>
//             quadrantPointCandidates.push({ ...p, type: 'quadrant', shapeId })
//           );
//         }
//       });
//     }

//     if (enabledSnapModes.perpendicular && prevMouse) {
//       const perp =
//         shape.name === 'line'
//           ? getPerpendicularPoint(shape, prevMouse)
//           : shape.name.includes('arc')
//             ? getPerpendicularToArc(shape, prevMouse)
//             : null;
//       if (perp) {
//         perpendicularPointCandidates.push({
//           ...perp,
//           type: 'perpendicular',
//           shapeId,
//         });
//       }
//     }

//     if (enabledSnapModes.tangent && prevMouse) {
//       if (shape.name.includes('arc') && shape.centerP) {
//         const tangent = getTangentPoints(shape, prevMouse);
//         if (tangent.length > 0) {
//           tangent.forEach((p) =>
//             tangentPointCandidates.push({ ...p, type: 'tangent', shapeId })
//           );
//         }
//       }
//     }
//   }

//   // Intersection points (ưu tiên thứ tư)
//   if (enabledSnapModes.intersection) {
//     const intersections = getAllIntersections(shapes);
//     if (intersections && intersections.length > 0) {
//       intersections.forEach((p) =>
//         intersectionCandidates.push({ ...p, type: 'intersection' })
//       );
//     }
//   }

//   // Grid points (ưu tiên thấp nhất)
//   if (enabledSnapModes.grid) {
//     const gridP = getNearestGridPoint(mouse, gridSize);
//     gridPointCandidates.push({ ...gridP, type: 'grid' });
//   }

//   // Kiểm tra theo thứ tự ưu tiên
//   // 1. Mid points
//   const closestMidPoint = getClosestSnapPoint(
//     mouse,
//     midPointCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestMidPoint) {
//     return closestMidPoint;
//   }

//   // 3. End points
//   const closestEndPoint = getClosestSnapPoint(
//     mouse,
//     endPointCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestEndPoint) {
//     return closestEndPoint;
//   }

//   // 4. Intersection points
//   const closestIntersection = getClosestSnapPoint(
//     mouse,
//     intersectionCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestIntersection) {
//     return closestIntersection;
//   }

//   // 5. Node points
//   const closestNodePoint = getClosestSnapPoint(
//     mouse,
//     nodePointCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestNodePoint) {
//     return closestNodePoint;
//   }

//   // 5. Quadrant points
//   const closestQuadrantPoint = getClosestSnapPoint(
//     mouse,
//     quadrantPointCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestQuadrantPoint) {
//     return closestQuadrantPoint;
//   }

//   // 5. Perpendicular points
//   const closestPerpendicularPoint = getClosestSnapPoint(
//     mouse,
//     perpendicularPointCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestPerpendicularPoint) {
//     return closestPerpendicularPoint;
//   }

//   // 5. Tangent points
//   const closestTangentPoint = getClosestSnapPoint(
//     mouse,
//     tangentPointCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestTangentPoint) {
//     return closestTangentPoint;
//   }

//   // 5. Nearest points
//   const closestNearestPoint = getClosestSnapPoint(
//     mouse,
//     nearestPointCandidates,
//     SNAP_THRESHOLD
//   );
//   if (closestNearestPoint) {
//     return closestNearestPoint;
//   }

//   // 6. Grid points (ưu tiên thấp nhất)
//   return getClosestSnapPoint(mouse, gridPointCandidates, SNAP_THRESHOLD);
// };
