class Project < ApplicationRecord
  belongs_to :user
  belongs_to :team
  validates :title, presence: true
  validates :description, presence: true
  validates :team_id, presence: true
end
