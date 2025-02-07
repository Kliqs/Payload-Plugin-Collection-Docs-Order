'use client'
import { DragHandleIcon, toast } from '@payloadcms/ui'
import { DraggableSortable } from '@payloadcms/ui/elements/DraggableSortable'
import { DraggableSortableItem } from '@payloadcms/ui/elements/DraggableSortable/DraggableSortableItem'
import { Radio } from '@payloadcms/ui/fields/RadioGroup/Radio'
import type { PaginatedDocs } from 'payload'
import React, { useEffect, useState } from 'react'
import { Dialog } from '../Dialog'
import './OrderDialog.css'
import { ToastContainer } from '@payloadcms/ui/providers/ToastContainer'
import { translations } from '../../translation'

interface Doc extends Record<string, unknown> {
  id: number | string
  order_number: number
  edited_to?: number
  edited_from?: number
}

const getTranslation = (key: string, currentLang: string = 'en') => {
  const langData = translations[currentLang as keyof typeof translations] || translations['en']
  const keys = key.split('.')
  let translation: any = langData

  for (let i = 0; i < keys.length; i++) {
    translation = translation[keys[i] as keyof typeof translation]

    if (!translation) {
      return key
    }
  }

  return translation
}

//DragDrop component
const DragDrop = ({ currentLang, t, displayField }: { currentLang: string; t: (key: string) => string; displayField: string }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const url = window.location.href
  let result = url.match(/\/collections\/([^?]+)/)
  const slug = result?.[1]
  const baseUrl = new URL(url).origin
  const limit = 20

  const [data, setData] = useState<{
    docs: Doc[]
    hasNextPage: boolean
    isLoading: boolean
    loadedPages: number
    totalDocs: number
  }>({
    docs: [],
    hasNextPage: false,
    isLoading: true,
    loadedPages: 0,
    totalDocs: 0,
  })

  const hasSave = data.docs.some(
    doc => typeof doc.edited_to === 'number' && doc.edited_to !== doc.order_number,
  )

  const sort = `sort=${sortOrder === 'desc' ? '-' : ''}order_number`

  const initData = () => {
    return fetch(`/api/${slug}?${sort}&limit=${limit}&locale=${currentLang}`)
      .then(res => res.json())
      .then(response => {
        console.log("Raw API response:", response); // Check the actual API response
        const { docs, hasNextPage, totalDocs } = response;
        setData({
          hasNextPage,
          isLoading: false,
          docs,
          loadedPages: 1,
          totalDocs,
        });
      });
  }

  useEffect(() => {
    if (slug) initData()
  }, [sortOrder])

  const moveRow = (moveFromIndex: number, moveToIndex: number) => {
    setData(prev => {
      const prevDocs = [...prev.docs]
      const newDocs = [...prev.docs]
      const [movedItem] = newDocs.splice(moveFromIndex, 1)
      newDocs.splice(moveToIndex, 0, movedItem)
      return {
        ...prev,
        docs: newDocs.map((doc, index) => {
          if (prevDocs[index].id !== doc.id) {
            return {
              ...doc,
              edited_to: prevDocs[index].edited_to ?? prevDocs[index].order_number,
            }
          }
          return doc
        }),
      }
    })
  }

  const save = async () => {
    const modifiedDocsData = data.docs
      .filter(doc => typeof doc.edited_to === 'number' && doc.edited_to !== doc.order_number)
      .map(doc => ({
        id: doc.id,
        order_number: doc.edited_to,
      }))

    try {
      const updateRequests = modifiedDocsData.map(async doc => {
        const req = await fetch(`/api/${slug}/${doc.id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_number: doc.order_number,
          }),
        })

        const resp = await req.json()
        return resp
      })

      const results = await Promise.all(updateRequests)

      setData(prev => ({ ...prev, isLoading: true }))
      await initData()
      toast.success('success', { position: 'bottom-center' })
    } catch (err) {
      console.log('Error updating documents:', err)
      toast.error('error', { position: 'bottom-center' })
    }
  }

  const loadMore = () => {
    setData(prev => ({ ...prev, isLoading: true }))
    return fetch(`/api/${slug}?${sort}&limit=${limit}&locale=${currentLang}&page=${data.loadedPages + 1}`)
      .then(res => res.json())
      .then(({ docs, hasNextPage }: PaginatedDocs<Doc>) =>
        setData(prev => ({
          hasNextPage,
          isLoading: false,
          docs: [...prev.docs, ...docs],
          loadedPages: prev.loadedPages + 1,
          totalDocs: prev.totalDocs,
        })),
      )
  }

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order)
    setData(prev => ({ ...prev, isLoading: true }))
  }

  return (
    <div className="collection-docs-order-content">
      <div className="radio">
        <Radio
          id="asc"
          isSelected={sortOrder === 'asc'}
          onChange={() => handleSortOrderChange('asc')}
          option={{
            label: t('asc'),
            value: 'asc',
          }}
          path="asc"
        />
        <Radio
          id="desc"
          isSelected={sortOrder === 'desc'}
          onChange={() => handleSortOrderChange('desc')}
          option={{
            label: t('desc'),
            value: 'desc',
          }}
          path="desc"
        />
      </div>
      <DraggableSortable
        ids={data.docs.map(doc => String(doc.id))}
        onDragEnd={({ moveFromIndex, moveToIndex }) => moveRow(moveFromIndex, moveToIndex)}
        className="order-list"
      >
        {data.docs.map((doc, index) => (
          <DraggableSortableItem disabled={false} id={String(doc.id)} key={doc.id}>
            {props => {
              return (
                <div
                  style={{ transform: props.transform }}
                  ref={props.setNodeRef}
                  className="order-item"
                >
                  <div
                    {...props.attributes}
                    {...props.listeners}
                    role="button"
                    className="order-drag"
                  >
                    <DragHandleIcon />
                  </div>
                  <a href={`${url}/admin/collections/${slug}/${doc.id}`} target="_blank">
                    {doc.order_number}
                    {doc.edited_to && doc.edited_to !== doc.order_number && ` - ${doc.edited_to}`}
                    {' - '}
                    {(doc[displayField] as string) ?? doc.slug} 
                    
                  </a>
                </div>
              )
            }}
          </DraggableSortableItem>
        ))}
      </DraggableSortable>
      <div className="order-buttons">
        {data.isLoading ? `${t('loading')}` : `${t('loaded')} ${data.docs.length}/${data.totalDocs}`}
        {hasSave && <button onClick={() => save()}>{'Save'}</button>}
        {data.hasNextPage && <button onClick={loadMore}>{'Load More'}</button>}
      </div>
    </div>
  )
}


// This component is used in the extendCollectionConfig function in the extendCollectionsConfig.ts file
export const CollectionDocsOrder = ({displayField}: {displayField: string}) => {
  const [currentLang, setCurrentLang] = useState('en')
  useEffect(() => {
    const lang = document.documentElement.lang || 'en'
    setCurrentLang(lang)
  }, [])

  const t = (key: string) => getTranslation(`collectionsDocsOrder.${key}`, currentLang)

  return (
    <div>
      <Dialog trigger={<button style={{ margin: 0, cursor: 'pointer' }}>
        {t('orderDocs')}
      </button>}>
        <DragDrop currentLang={currentLang} t={t} displayField={displayField}/>
        <ToastContainer />
      </Dialog>
    </div>
  )
}
