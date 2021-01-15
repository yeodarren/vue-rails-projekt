class User < ApplicationRecord
  before_save { self.email = email.downcase }
  has_many :projects
  has_many :user_teams
  has_many :teams, through: :user_teams
  validates :name, presence: true 
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, 
                    uniqueness: { case_sensitive: false }, 
                    format: { with: VALID_EMAIL_REGEX }
  has_secure_password
end
