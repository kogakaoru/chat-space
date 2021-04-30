## usersテーブル

|Column|Type|Options|
|------|----|-------|
|username|string|null: false|


### Association
- has_many :groups_users
- has_many :groups, through: :groups_users



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|


### Association
- has_many :groups_users
- has_many :users, through: :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user