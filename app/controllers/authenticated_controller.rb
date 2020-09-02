# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::Authenticated

  protect_from_forgery with: :exception, unless: :valid_jwt_header?
  before_action :update_scopes_if_insufficient_access

  UPDATE_SCOPES_HEADER = 'X-Shopify-Insufficient-Scopes'

  private

  def valid_jwt_header?
    jwt_shopify_domain.present?
  end

  def update_scopes_if_insufficient_access
    normalized_expected_scopes = ShopifyApp.configuration.scope.split(',')
    missing_scopes = normalized_expected_scopes - normalized_scopes(associated_scopes)
    signal_insufficient_scopes unless missing_scopes.empty?
  end

  def signal_insufficient_scopes
    response.set_header(UPDATE_SCOPES_HEADER, true)
    head(403)
  end

  def normalized_scopes(scopes)
    scope_list = scopes.map(&:strip).reject(&:empty?).uniq
    ignore_scopes = scope_list.map { |scope| scope =~ /\Awrite_(.*)\z/ && "read_#{$1}" }.compact
    scope_list - ignore_scopes
  end
end
