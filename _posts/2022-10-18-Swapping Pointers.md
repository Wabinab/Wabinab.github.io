# Swapping Pointers Logic

There are times we need to swap pointers, perhaps things are stored with a next_id pointer. For example, consider first scenario: 

## Scenario 1

```
admin -> member -> vip -> guest. 
```

We're currently in `member`, we want to swap with `vip`
Or we're currently in `vip`, we want to swap with `member`. 



...

## Scenario 2

```
admin -> vip -> guest -> member
```

We're currently in `guest`, we want to swap with `member`. 

1. `guest` points from `member` to `nil` (originally what `member` pointing to).
2. `member` points from `nil` to `guest`
3. `vip` points from `guest` to `member`


## Scenario 3

```
admin -> vip -> guest -> member 
```

We're currently in `member`, we want to swap with `guest`. 


## Scenario 4 and 5 (not discussed)

```
vip -> admin -> member -> guest
```

We're currently in `vip`, we want to swap with `admin`. 

And we're currently in `admin`, we want to swap with `vip`. 
