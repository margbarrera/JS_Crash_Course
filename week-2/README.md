# Project description: gift-giving app
## What it used to do, and hopefully will do again when I'm done
This app is supposed to help people buy presents for their loved ones.
It lets the users save cool gift ideas, browse through them and assign future gifts to their friends and family, so that when the next gift-giving occasion comes they don't find themselves in the stressing situation of having to think of something last-minute. It can also help keep a log of what a user has gifted a friend in the past, so that nobody gets the same gift twice.
Events can also be created between users so that everybody can check if the gift they intend to bring is already 'taken', or is as cool as what other people are bringing. Peer pressure, yay!
To make things easy users can also check their calendar to be notified of upcoming birthdays and events.


## We're I'm at
I'm reworking throught absolutely everything, so not much is working at the moment. A little patience :)
So far what we *can* actually do is:
1) Create and remove users, gifts and events
2) USER: add and remove friends on a user profile page
3) USER: save and discard gift ideas
4) EVENT: Users can be invited and uninvited to events
5) EVENT: Gifts can be added (and removed) to the gift list of an event by a user.

All working post instructions are printed to the browser console in user/all, gift/all, event/all URLs, as well as in the individual user/:id and event/:id URLs.
But for clarity, some examples:

## ——— URLS AND ACTIONS ———

### USER:

**ADDING FRIENDS:**<br>
axios.post('/user/5dcd727ee3852100bea9850a/add-friend', {friend:'5dcecd61e7f7a31ef9fd36fc'})


**UN-FRIENDING:**<br>
axios.post('/user/5dcd727ee3852100bea9850a/unfriend', {friend:'5dcecd61e7f7a31ef9fd36fc'})


**SAVING GIFT IDEA:**<br>
axios.post('/user/5dcd727ee3852100bea9850a/save-gift-idea', {gift:'5dcece7ce7f7a31ef9fd36fe'})


**DISCARD GIFT IDEAS:**<br>
axios.post('/user/5dcd727ee3852100bea9850a/discard-gift-idea', {gift:'5dcece7ce7f7a31ef9fd36fe'})


### EVENT:

**INVITE GUEST:**<br>
axios.post('/event/5dced47a1c1a9a2065fc6352/invite-guest', {guest:'5dcecd61e7f7a31ef9fd36fc'})

**REMOVE GUEST:**<br>
axios.post('/event/5dced47a1c1a9a2065fc6352/remove-guest', {guest:'5dcecd61e7f7a31ef9fd36fc'})

**ADD GIFT TO EVENT:** (requires a user who wants to contribute, and a gift)<br>
axios.post('/event/5dd1243c6fc9dc25c3d05824/add-gift', {user:'5dcecd61e7f7a31ef9fd36fc', gift:'5dcd733365694d00dcb4e299' })

**REMOVE GIFT FROM EVENT GIFT LIST:**<br>
axios.post('/event/5dd1243c6fc9dc25c3d05824/remove-gift', {gift:'5dcec289c2c77e1d1852d5af' })