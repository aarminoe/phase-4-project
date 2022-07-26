class UsersController < ApplicationController
    has_many :friends
    has_many :posts
    has_many :groups
    has_many :comments, through: :posts 
    has_many :likes, through: :posts
end
