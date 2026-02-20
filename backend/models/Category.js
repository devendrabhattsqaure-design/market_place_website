/**
 * Category Model
 * Product categories for organization
 */

import { Schema, model, Document } from 'mongoose'

export interface ICategory extends Document {
  _id: string
  name: string
  slug: string
  description?: string
  icon?: string
  image?: string
  parentCategory?: string
  productCount: number
  isActive: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    icon: String, // Icon name or emoji
    image: String, // Category image URL
    parentCategory: {
      type: String,
      ref: 'Category',
      sparse: true,
    },
    productCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
categorySchema.index({ name: 1 })
categorySchema.index({ slug: 1 })
categorySchema.index({ isActive: 1, displayOrder: 1 })

export const Category = model<ICategory>('Category', categorySchema)
export default Category
