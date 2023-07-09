import { Box, Button, Input, useToast } from "@chakra-ui/react"
import { getDocument } from "pdfjs-dist"
import { ChangeEvent, ChangeEventHandler, FormEvent } from "react"
import { supabase } from '@/pages/.sdk/.supabase-conn'

const AboutPage = () => {

  const toast = useToast()

  const getDoc = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (!fileList?.length) return toast({status: 'warning', title: 'Erro', description: 'Selecione um PDF'})

    const file = fileList[0]
    const { data, error } = await supabase
      .storage
      .from('public-media-bucket')
      .upload('file1.pdf', file, {
        cacheControl: '3600',
        upsert: false
      })

    console.log('storage: ', data, error)
  }

  return (
    <Box>
      <Input colorScheme="pink" type="file" placeholder="Selecione o arquivo" onChange={e => getDoc(e)} />
    </Box>
  )
}

export default AboutPage