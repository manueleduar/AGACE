-- A00516971: Sergio Diosdado
-- A00516978: Iñaki Janeiro
-- A01194108: Eduardo Vega

-- Fibonacci: Funcion que regresa el termino "n" de Fibonacci:
fibonacci :: Integer -> Integer
fibonacci 0 = 0
fibonacci 1 = 1
fibonacci x = (fibonacci (x-1) + fibonacci (x-2))

-- Mayor: Regresa el mayor de una lista
mayor = foldr1 (\x y ->if x >= y then x else y)

-- Mezcla: Regresa una lista en orden con los elementos de dos listas ordenadas
mezcla :: Ord a => [a] -> [a] -> [a]
mezcla [] x = x
mezcla x [] = x
-- (x:xs) = Primero (first) de la lista x
-- (y:ys) = Primero (first) de la lista y
mezcla (x:xs) (y:ys) | y < x     = y : mezcla (x:xs) ys
mezcla (x:xs) (y:ys) | otherwise = x : mezcla xs (y:ys)

-- Repetidos: Devuelve una lista con los elementos repetidos de una lista
repetidos :: Eq a => [a] -> [a]
repetidos [] = []
repetidos (x:r) =
    if (elem x r) then (x:repetidos(r))
    else repetidos r