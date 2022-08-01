class Group < ApplicationRecord
    has_many :usergroups
    has_many :users, through: :usergroups
end
