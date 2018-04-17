Campaigns

# Offers Module
Offers
Offers Landers // id, offer_id, title, url
Offers Funnels // id, offer_id, title
Offers Funnels Landers // id, offer_id, funnel_id, lander_id

# Campaigns Module
Campaigns
Campaigns Settings
Campaigns Offers
Campaigns Events
Campaigns Targeting // id, campaign_id, targeting_id, active

# Targeting Module (Splitter)
Targeting // id, title(optional), active
Targeting Modules // id, targeting_id, module_id
Modules // id, code, title (Country, Device, Time, Weights)
Modules Options // id, option_type_id, key, default_value
Items // id, targeting_id, item
Items Metadata // id, item_id, meta1, meta2, meta3, meta4, meta5
Targeting Modules Items // id, targeting_module_id, item_id
Targeting Modules Items Options // id, targeting_module_item_id, module_option_id, value
Campaign A need to split 50% to USA and 50% to other countries
Specific lander B of campaign A needs to split 100% Russia

Targeting
    - 1, My Campaign Target
Modules
    - 1, Country
Targeting Modules
    - 1, 1, 1
Items
    - 1, 1, Lander A
    - 2, 1, Lander B
    - 3, 1, Lander C Russia Only
Items Meta Data
    - 1, 1, All, 50
    - 1, 1, USA, 50
    - 1, 1, Italy, 20
    - 1, 1, Europe, 20


# Ensure Event - ensure user has the current tag/event when getting into funnel page, if not - redirect or warn
# Is 1 page funnel would be called a lander?

# ---- Scenario -----
Amazon affiliate has his own blog and wants to track his blog sells,
he has multiple posts and reviews in his blog about specific amazon products
and he wish to track it, he also want to optimize good products which for them he have more
then 1 review/post and he wants to check which review/post is the best for who.

1. He adds his promoted products as offers and there funnels/landers
2. He has multiple options for campaign creation:
    1. Create campaign per product, add the offer
    (or offers if he has multiple posts/review on the same product) of the product to the campaign
    2. Create One campaign for everything and create targeting splits for specific offers (product based)
Which ever option he decides, we cannot let customer A take option 1 and customer B take option 2,
this require us to support them since they are not doing the calculation we do on which way is the best
or which way is actually the one our system is BUILT on, other words, they are stupid people that has no idea how to configure
our system, even if we will add million videos or 1 million dollar UX video.
therefore, we need to do it for them. we cant do it to everyone specially but we can give them 1 more layer of mercy
what does it mean:
Instead of letting the affiliate break his head on how to add his current products/offers/sales/...etc
we will create a baseline for commonly used affiliation methods.
For example:
campaigns can ask the following questions on creating before CPA/PAYMENT/CVC/CTC/CZB

1. What are you trying to promote?
    1. Sales of only e-commerce (Amazon/Ebay etc..)
    2. Online Offer

2. Where are you trying to promote them (Check more then one)
    1. In my website/blog
    2. Social media sources (google/facebook)
    3. Anther sources

3.

# ---- Word about prediction ------
This is not specific module of our system, its global term of everything we do
with machine learning which can take a part in multiple areas in our system

# Streaming Dbs
MemSQL
Redis
Pedis
Scylla

# Writes Dbs
Cassandra
Mongo
Scylla

# Aggregation & Search
ES
MongoDB
