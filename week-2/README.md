# Project description: gift-giving app
This app is supposed to help people buy presents for their loved ones.
It lets the users save cool gift ideas, browse through them and plan in advance future gifts for their friends and family, so that they don't find themselves in the stressing situation of having to think of something last-minute.
To make things easier it notifies users of upcoming birthdays and help prevent giving somebody the same gift twice (happens all the time).
Someday it will do a lot more things, hopefully.

## The Classes

### Database
Not a class, but rather a module. It stores all the instances of the classes, in an object, where the ids serve as key to access the objects. It has so far three methods, one is to save in the objects, one is to save them as Json files, and one to load the Json files.

### User
**Users** are the persons that are going to actually use the app. They will have a login and password (at some point in the future). For now, they will be created just with a name and an ID. They will also have a social circle composed of their friends and family(!)

Users can perform many tasks, such as:
* save gift ideas (even if they don't know who to give them to, yet)
* browse through their gift ideas by price or by tag
* add or remove friends from their social circle, because you never know and life is ever-changing
* assign a gift idea to someone in their social circle, waiting for the perfect occasion to gift it
* check their calendar to know if somebody's birthday is approaching and do something about it!
    In the future I would like to add other common gift-giving occasions to the calendar (both global - religious or otherwise - and personal e.g. weddings, anniversaries).
    For now it's just birthdays ¯\\\_(ツ)\_/¯
* actually buy the gift for one of their friends: they will be provided with a link to the article in an online store
* keep track of what they previously gifted someone. If they attempt to gift somebody the same article twice they will be notified and (if present) an alternative gift will be suggested

### Gift
**Gifts** are possible gift ideas. They will be created with a name, a unique ID, a price in Euros and (optional) a URL where they can be bought when the time is right. Since they are inanimate objects they cannot perform many tasks themselves, but they can:
* be assigned tags according to their type (e.g. useful, ironic, food-related, weird, child-friendly)
* store an archive of people they have been gifted to and on how many occasions. This seems a bit silly but it would be cool to have stats on what's the item you've gifted more often and such

### Friend
**Friends** are the people the users can buy presents for. They are created with a name, a unique ID and a birthday date. Friends are on the receiving hand, so cannot do much as well, except:
* be assigned tags to keep track of their tastes and preferences
* store a record of all the gifts they received in the past, and all the possible gifts the users would like to buy them in the future

#### New Class: Event
**properties:** name, giftee, date, guestlist, giftlist, wishlist(optional)

* everybody can be invited (but not the giftee naturally)
* users that are invited can submit the gift they decided to give for the occasion to the giftlist,
* duplicates are notified and rejected
* its date is automatically pushed to the calendar of the guests
* lists of guests and gifts can be read

## New possible directions to take (it's going to take AGES)
First thing that I think I should implement is a more solid calendar. The most important issue is that it doesn't use proper Dates now, just shitty strings. As it is, it's just a list of birthdays really, but it should really include other occasions as well. Maybe it can be an object? Every entry on the calendar should be a DATE that has one or more GIFTEES attached. For example: 01/01(Pina), 12/24(Pina, Mom, Dad, Gino). Let's think about it.

Second thing is a bigger change: this should be a social app (because we don't have enough of those apparently).
Ideally, in a certain sense, whatever person is on the app (user) is a potential friend to some other user. Sounds romantic but I just mean from an application point of view. Maybe we don't need the friend class at all? It is needed only because some people will not be on the app, it's kind of a shadow profile really.
Anyway, since everybody can be friends with everybody, they can also be gifted stuff, that means copying a few features of Friend in User, as well as other stuff. Let's see..

#### New features of User
* since they're also on the receiving hand of gifts now, users too can be assigned tags to keep track of their tastes and preferences (assigned by themselves, that is)
* they should store a record of all the gifts they received in the past too (and by whom). Maybe this list shouldn't be visible to everybody though. should it?
* For lazy and imagination-less people I can add the possibility for the user to make a wishlist. This can be a default one (MyList) or a named one (MyWeddingList). So that would mean a user can have multiple wishlists. Maybe wishlist CAN BE A CLASS! YAY!
* invitedTo needs to be a property that stores the events the user is invited to. This adds the events to the user's calendar.

#### New Class: WishList!
**properties:** name, ID, creator, eventually *can* be connected to an event
* only the creator can add items
* it stores possible gifts (it has to store them as objects though, otherwise it's useless)
* it can be read by other people, and it has to have a method to remove an item from the list when somebody buys it for the creator

#### New Possible Class: Secret Santa Event
**properties:** name, date, guestlist, maxBudget? (just so nobody will be embarassed when they receive a ferrari)

* every guest will be assigned another guest randomly but so that there are no overlaps. obviously this is going to be very tricky to implement but maybe somebody has already written something like this? I hope so.
* each guest can retrieve the name of the person he has been assigned to, but nothing else. once he knows that he can try and access their wishlist, if they happen to have one. If not, creativity!